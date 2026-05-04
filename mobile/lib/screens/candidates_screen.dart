import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';

class CandidatesScreen extends StatefulWidget {
  const CandidatesScreen({super.key});

  @override
  State<CandidatesScreen> createState() => _CandidatesScreenState();
}

class _CandidatesScreenState extends State<CandidatesScreen> {
  List<dynamic> _candidates = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchCandidates();
  }

  Future<void> _fetchCandidates() async {
    final apiService = Provider.of<ApiService>(context, listen: false);
    final candidates = await apiService.getCandidates();
    if (mounted) {
      setState(() {
        _candidates = candidates;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Discover Talent'),
        actions: [
          IconButton(icon: const Icon(Icons.filter_list_rounded), onPressed: () {}),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchCandidates,
        child: _isLoading 
          ? const Center(child: CircularProgressIndicator())
          : _candidates.isEmpty 
            ? const Center(child: Text('No candidates found matching your criteria.'))
            : ListView.separated(
                padding: const EdgeInsets.all(12),
                itemCount: _candidates.length,
                separatorBuilder: (context, index) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  final candidate = _candidates[index];
                  final profile = candidate['profile'] ?? {};
                  final name = '${profile['firstName'] ?? 'User'} ${profile['lastName'] ?? ''}'.trim();
                  
                  return Card(
                    child: ListTile(
                      contentPadding: const EdgeInsets.all(12),
                      leading: CircleAvatar(
                        radius: 28,
                        backgroundColor: const Color(0xFF0A66C2),
                        child: Text(
                          name.isNotEmpty ? name[0] : 'U',
                          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                        ),
                      ),
                      title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(profile['headline'] ?? 'Professional Candidate'),
                          const SizedBox(height: 4),
                          Text(profile['location'] ?? 'Global', style: const TextStyle(fontSize: 12, color: Colors.grey)),
                        ],
                      ),
                      trailing: OutlinedButton(
                        onPressed: () {},
                        style: OutlinedButton.styleFrom(
                          minimumSize: const Size(80, 32),
                          padding: EdgeInsets.zero,
                        ),
                        child: const Text('View'),
                      ),
                    ),
                  );
                },
              ),
      ),
    );
  }
}
