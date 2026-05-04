import 'package:flutter/material.dart';

class MessagingScreen extends StatelessWidget {
  const MessagingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Messaging', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: Colors.white,
        elevation: 1,
        actions: [
          IconButton(icon: const Icon(Icons.edit, color: Colors.blue), onPressed: () {}),
        ],
      ),
      body: ListView.separated(
        itemCount: 5,
        separatorBuilder: (context, index) => const Divider(height: 1),
        itemBuilder: (context, index) {
          return const ChatTile();
        },
      ),
    );
  }
}

class ChatTile extends StatelessWidget {
  const ChatTile({super.key});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const CircleAvatar(backgroundColor: Colors.grey, radius: 26),
      title: const Text('Jane Smith', style: TextStyle(fontWeight: FontWeight.bold)),
      subtitle: const Text('Hey John! How have you been?', maxLines: 1, overflow: TextOverflow.ellipsis),
      trailing: const Text('9:41 AM', style: TextStyle(fontSize: 12, color: Colors.grey)),
      onTap: () {},
    );
  }
}
