import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import 'package:intl/intl.dart';

class JobsScreen extends StatefulWidget {
  const JobsScreen({super.key});

  @override
  State<JobsScreen> createState() => _JobsScreenState();
}

class _JobsScreenState extends State<JobsScreen> {
  List<dynamic> _jobs = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchJobs();
  }

  Future<void> _fetchJobs() async {
    final apiService = Provider.of<ApiService>(context, listen: false);
    final jobs = await apiService.getJobs();
    if (mounted) {
      setState(() {
        _jobs = jobs;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jobs'),
        actions: [
          IconButton(icon: const Icon(Icons.share_outlined), onPressed: () {}),
          IconButton(icon: const Icon(Icons.more_vert_rounded), onPressed: () {}),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchJobs,
        child: _isLoading 
          ? const Center(child: CircularProgressIndicator())
          : _jobs.isEmpty 
            ? const Center(child: Text('No jobs available at the moment.'))
            : ListView.separated(
                padding: const EdgeInsets.all(12),
                itemCount: _jobs.length + 1,
                separatorBuilder: (context, index) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  if (index == 0) {
                    return const Padding(
                      padding: EdgeInsets.symmetric(vertical: 8.0, horizontal: 4.0),
                      child: Text(
                        'Recommended for you',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black87),
                      ),
                    );
                  }
                  final job = _jobs[index - 1];
                  final createdAt = DateTime.tryParse(job['createdAt'] ?? '') ?? DateTime.now();
                  final timeAgo = _getTimeAgo(createdAt);

                  return JobItem(
                    title: job['title'] ?? 'Position',
                    company: job['company'] ?? 'Company',
                    location: job['location'] ?? 'Remote',
                    time: timeAgo,
                  );
                },
              ),
      ),
    );
  }

  String _getTimeAgo(DateTime dateTime) {
    final difference = DateTime.now().difference(dateTime);
    if (difference.inDays > 0) return '${difference.inDays}d ago';
    if (difference.inHours > 0) return '${difference.inHours}h ago';
    if (difference.inMinutes > 0) return '${difference.inMinutes}m ago';
    return 'Just now';
  }
}

class JobItem extends StatelessWidget {
  final String title;
  final String company;
  final String location;
  final String time;

  const JobItem({super.key, required this.title, required this.company, required this.location, required this.time});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: InkWell(
        onTap: () {},
        borderRadius: BorderRadius.circular(8),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 52, 
                height: 52, 
                decoration: BoxDecoration(
                  color: const Color(0xFFF3F2EF),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Icon(Icons.business_center_rounded, color: Color(0xFF0A66C2), size: 32),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: Color(0xFF0A66C2),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      company,
                      style: const TextStyle(fontSize: 14, color: Colors.black87, fontWeight: FontWeight.w500),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '$location',
                      style: const TextStyle(color: Colors.black54, fontSize: 13),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      time,
                      style: const TextStyle(color: Colors.green, fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
              ),
              const Icon(Icons.bookmark_border_rounded, color: Colors.black54),
            ],
          ),
        ),
      ),
    );
  }
}
