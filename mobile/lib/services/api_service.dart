import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter/foundation.dart';

class ApiService extends ChangeNotifier {
  final Dio _dio = Dio();
  final _storage = const FlutterSecureStorage();
  
  // Use 10.0.2.2 for Android Emulator, localhost for Windows/iOS
  static const String baseUrl = 'http://10.0.2.2:5000/api'; 
  // static const String baseUrl = 'http://localhost:5000/api'; 

  String? _token;
  int? _userId;
  int? _role;
  bool _isLoggedIn = false;

  bool get isLoggedIn => _isLoggedIn;
  String? get token => _token;
  int? get userId => _userId;
  int? get role => _role;

  ApiService() {
    _dio.options.baseUrl = baseUrl;
    _checkLoginStatus();
  }

  Future<void> _checkLoginStatus() async {
    _token = await _storage.read(key: 'token');
    final roleStr = await _storage.read(key: 'role');
    if (roleStr != null) {
      _role = int.tryParse(roleStr);
    }
    final userIdStr = await _storage.read(key: 'userId');
    if (userIdStr != null) {
      _userId = int.tryParse(userIdStr);
    }
    _isLoggedIn = _token != null;
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });

      if (response.statusCode == 200) {
        _token = response.data['token'];
        final user = response.data['user'];
        _userId = user['id'];
        _role = user['role'];
        
        await _storage.write(key: 'token', value: _token);
        await _storage.write(key: 'role', value: _role);
        await _storage.write(key: 'userId', value: _userId.toString());
        
        _isLoggedIn = true;
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      debugPrint('Login error: $e');
      return false;
    }
  }

  Future<bool> register(String email, String password, String firstName, String lastName, int role) async {
    try {
      final response = await _dio.post('/auth/register', data: {
        'email': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
        'role': role,
      });

      if (response.statusCode == 201) {
        _token = response.data['token'];
        final user = response.data['user'];
        _userId = user['id'];
        _role = user['role'];

        await _storage.write(key: 'token', value: _token);
        await _storage.write(key: 'role', value: _role);
        await _storage.write(key: 'userId', value: _userId.toString());

        _isLoggedIn = true;
        notifyListeners();
        return true;
      }
      return false;
    } catch (e) {
      debugPrint('Registration error: $e');
      return false;
    }
  }

  Future<void> logout() async {
    await _storage.delete(key: 'token');
    await _storage.delete(key: 'role');
    await _storage.delete(key: 'userId');
    _token = null;
    _userId = null;
    _role = null;
    _isLoggedIn = false;
    notifyListeners();
  }

  // Get User Posts / Feed
  Future<List<dynamic>> getFeed() async {
    try {
      final response = await _dio.get(
        '/posts/feed',
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response.data;
    } catch (e) {
      debugPrint('Error fetching feed: $e');
      return [];
    }
  }

  // Get Jobs
  Future<List<dynamic>> getJobs() async {
    try {
      final response = await _dio.get(
        '/jobs',
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response.data;
    } catch (e) {
      debugPrint('Error fetching jobs: $e');
      return [];
    }
  }

  // Get Profile
  Future<Map<String, dynamic>?> getProfile(int userId) async {
    try {
      final response = await _dio.get(
        '/profiles/$userId',
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response.data;
    } catch (e) {
      debugPrint('Error fetching profile: $e');
      return null;
    }
  }

  // Get Candidates (for Businesses)
  Future<List<dynamic>> getCandidates() async {
    try {
      final response = await _dio.get(
        '/profiles/candidates',
        options: Options(headers: {'Authorization': 'Bearer $_token'}),
      );
      return response.data;
    } catch (e) {
      debugPrint('Error fetching candidates: $e');
      return [];
    }
  }
}
