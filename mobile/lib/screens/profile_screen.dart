import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profile'), backgroundColor: const Color(0xFF0A66C2)),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                Container(height: 120, color: Colors.blueGrey[200]),
                const Positioned(
                  bottom: -40,
                  left: 16,
                  child: CircleAvatar(radius: 50, backgroundColor: Colors.white, child: CircleAvatar(radius: 46, backgroundColor: Colors.grey)),
                ),
              ],
            ),
            const SizedBox(height: 50),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('John Doe', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
                  const Text('Software Engineer | Flutter Developer'),
                  const SizedBox(height: 8),
                  const Text('San Francisco, CA • 500+ connections', style: TextStyle(color: Colors.grey)),
                  const SizedBox(height: 16),
                  ElevatedButton(onPressed: () {}, child: const Text('Open to')),
                  const SizedBox(height: 24),
                  const Text('About', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  const Text('Highly motivated developer with a passion for clean code and user-centric design.'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
