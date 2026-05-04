import 'package:flutter/material.dart';

class JobsScreen extends StatelessWidget {
  const JobsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Jobs', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(icon: const Icon(Icons.more_vert, color: Colors.grey), onPressed: () {}),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          const Text('Recommended for you', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          const JobItem(title: 'Data Scientist', company: 'AI Labs', location: 'Remote', time: '1d ago'),
          const JobItem(title: 'Product Manager', company: 'FinTech Corp', location: 'London, UK', time: '3d ago'),
          const JobItem(title: 'Backend Engineer', company: 'CloudScale', location: 'Remote', time: '5h ago'),
        ],
      ),
    );
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
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(vertical: 8),
      leading: Container(width: 48, height: 48, color: Colors.grey[200], child: const Icon(Icons.work_outline)),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF0A66C2))),
      subtitle: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(company),
          Text('$location • $time', style: const TextStyle(color: Colors.grey, fontSize: 12)),
        ],
      ),
      trailing: const Icon(Icons.bookmark_border),
    );
  }
}
