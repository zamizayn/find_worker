import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  Map<String, dynamic>? _profile;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchProfile();
  }

  Future<void> _fetchProfile() async {
    final apiService = Provider.of<ApiService>(context, listen: false);
    if (apiService.userId != null) {
      final profile = await apiService.getProfile(apiService.userId!);
      if (mounted) {
        setState(() {
          _profile = profile;
          _isLoading = false;
        });
      }
    } else {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    final firstName = _profile?['firstName'] ?? 'FindWorker';
    final lastName = _profile?['lastName'] ?? 'User';
    final headline = _profile?['headline'] ?? 'Professional at FindWorker';
    final location = _profile?['location'] ?? 'Global';
    final bio = _profile?['bio'] ?? 'No bio available yet.';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined, color: Colors.black54),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.logout_rounded, color: Colors.black54),
            onPressed: () {
              Provider.of<ApiService>(context, listen: false).logout();
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchProfile,
        child: SingleChildScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header Section
              Stack(
                clipBehavior: Clip.none,
                children: [
                  Container(
                    height: 100, 
                    width: double.infinity,
                    color: const Color(0xFFADB5BD),
                  ),
                  Positioned(
                    bottom: -50,
                    left: 20,
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                      ),
                      child: CircleAvatar(
                        radius: 54, 
                        backgroundColor: const Color(0xFF0A66C2),
                        child: Text(
                          firstName[0], 
                          style: const TextStyle(fontSize: 48, color: Colors.white, fontWeight: FontWeight.bold)
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 60),
              
              // Personal Info
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '$firstName $lastName', 
                      style: const TextStyle(fontSize: 26, fontWeight: FontWeight.bold, color: Colors.black, letterSpacing: -0.5),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      headline, 
                      style: const TextStyle(fontSize: 16, color: Colors.black87),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      '$location • 500+ connections', 
                      style: const TextStyle(color: Colors.black54, fontSize: 13, fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 20),
                    
                    // Action Buttons
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () {}, 
                            child: const Text('Open to'),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: OutlinedButton(
                            onPressed: () {}, 
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFF0A66C2)),
                              foregroundColor: const Color(0xFF0A66C2),
                              minimumSize: const Size(double.infinity, 48),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
                            ),
                            child: const Text('Add section'),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 24),
              const Divider(thickness: 8, color: Color(0xFFE9ECEF)),
              
              // Analytics Section (Professional Look)
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Analytics', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 4),
                    Text('Private to you', style: TextStyle(color: Colors.grey[600], fontSize: 14)),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        const Icon(Icons.people_alt, color: Colors.black54, size: 20),
                        const SizedBox(width: 8),
                        Text('124 profile views', style: const TextStyle(fontWeight: FontWeight.bold)),
                      ],
                    ),
                  ],
                ),
              ),
              
              const Divider(thickness: 8, color: Color(0xFFE9ECEF)),

              // About Section
              Padding(
                padding: const EdgeInsets.all(20.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('About', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    Text(
                      bio,
                      style: const TextStyle(fontSize: 15, color: Colors.black87, height: 1.5),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
