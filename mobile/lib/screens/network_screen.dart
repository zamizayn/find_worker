import 'package:flutter/material.dart';

class NetworkScreen extends StatelessWidget {
  const NetworkScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Network', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
             Padding(
               padding: const EdgeInsets.all(16.0),
               child: Row(
                 mainAxisAlignment: MainAxisAlignment.spaceBetween,
                 children: const [
                   Text('Manage my network', style: TextStyle(fontSize: 16, color: Color(0xFF0A66C2), fontWeight: FontWeight.bold)),
                   Icon(Icons.chevron_right, color: Colors.grey),
                 ],
               ),
             ),
             const Divider(thickness: 8, color: Color(0xFFF3F2EF)),
             const Padding(
               padding: EdgeInsets.all(16.0),
               child: Text('Invitations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
             ),
             const InvitationItem(name: 'Sarah Williams', headline: 'HR at Global Tech'),
             const Divider(thickness: 8, color: Color(0xFFF3F2EF)),
             const Padding(
               padding: EdgeInsets.all(16.0),
               child: Text('People you may know', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
             ),
             GridView.builder(
               shrinkWrap: true,
               physics: const NeverScrollableScrollPhysics(),
               padding: const EdgeInsets.symmetric(horizontal: 16),
               gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                 crossAxisCount: 2,
                 childAspectRatio: 0.75,
                 mainAxisSpacing: 16,
                 crossAxisSpacing: 16,
               ),
               itemCount: 4,
               itemBuilder: (context, index) => const SuggestionCard(),
             ),
          ],
        ),
      ),
    );
  }
}

class InvitationItem extends StatelessWidget {
  final String name;
  final String headline;

  const InvitationItem({super.key, required this.name, required this.headline});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const CircleAvatar(backgroundColor: Colors.grey),
      title: Text(name, style: const TextStyle(fontWeight: FontWeight.bold)),
      subtitle: Text(headline, maxLines: 1),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          IconButton(icon: const Icon(Icons.close, color: Colors.grey), onPressed: () {}),
          IconButton(icon: const Icon(Icons.check_circle_outline, color: Color(0xFF0A66C2)), onPressed: () {}),
        ],
      ),
    );
  }
}

class SuggestionCard extends StatelessWidget {
  const SuggestionCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
           Container(height: 50, color: Colors.grey[300]),
           const SizedBox(height: 8),
           const CircleAvatar(radius: 30, backgroundColor: Colors.grey),
           const SizedBox(height: 8),
           const Text('Mike Johnson', style: TextStyle(fontWeight: FontWeight.bold)),
           const Text('Software Engineer', style: TextStyle(fontSize: 12, color: Colors.grey)),
           const Spacer(),
           Padding(
             padding: const EdgeInsets.all(8.0),
             child: OutlinedButton(
               onPressed: () {},
               child: const Text('Connect'),
             ),
           ),
        ],
      ),
    );
  }
}
