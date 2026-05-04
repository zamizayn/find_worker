import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<dynamic> _posts = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchFeed();
  }

  Future<void> _fetchFeed() async {
    final apiService = Provider.of<ApiService>(context, listen: false);
    final posts = await apiService.getFeed();
    if (mounted) {
      setState(() {
        _posts = posts;
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: Container(
          height: 40,
          margin: const EdgeInsets.only(right: 16),
          decoration: BoxDecoration(
            color: const Color(0xFFEDF3F8),
            borderRadius: BorderRadius.circular(4),
          ),
          child: const TextField(
            style: TextStyle(color: Colors.black, fontSize: 15),
            decoration: InputDecoration(
              hintText: 'Search',
              prefixIcon: Icon(Icons.search, size: 20, color: Colors.black54),
              border: InputBorder.none,
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
              contentPadding: EdgeInsets.symmetric(vertical: 10),
            ),
          ),
        ),
        leading: const Padding(
          padding: EdgeInsets.all(10.0),
          child: CircleAvatar(
            backgroundColor: Color(0xFF0A66C2),
            child: Icon(Icons.person, color: Colors.white, size: 20),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.chat_bubble_outline_rounded, color: Colors.black54),
            onPressed: () {},
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: _fetchFeed,
        child: _isLoading 
          ? const Center(child: CircularProgressIndicator())
          : _posts.isEmpty 
            ? const Center(child: Text('No posts yet.'))
            : ListView.separated(
                padding: const EdgeInsets.only(top: 8),
                itemCount: _posts.length,
                separatorBuilder: (context, index) => const SizedBox(height: 8),
                itemBuilder: (context, index) {
                  final post = _posts[index];
                  final author = post['author'] ?? {};
                  final profile = author['profile'] ?? {};
                  final name = '${profile['firstName'] ?? 'User'} ${profile['lastName'] ?? ''}'.trim();
                  
                  return PostCard(
                    name: name.isEmpty ? 'FindWorker User' : name,
                    headline: profile['headline'] ?? 'Professional',
                    content: post['content'] ?? '',
                  );
                },
              ),
      ),
    );
  }
}

class PostCard extends StatelessWidget {
  final String name;
  final String headline;
  final String content;

  const PostCard({
    super.key,
    required this.name,
    required this.headline,
    required this.content,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.zero,
      child: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const CircleAvatar(
                  radius: 24,
                  backgroundColor: Color(0xFF0A66C2),
                  child: Icon(Icons.person, color: Colors.white, size: 28),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        name,
                        style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.black),
                      ),
                      Text(
                        headline,
                        style: const TextStyle(fontSize: 13, color: Colors.black54),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        '1h • 🌏',
                        style: TextStyle(fontSize: 12, color: Colors.grey[500]),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.more_horiz, color: Colors.black54),
                  onPressed: () {},
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              content,
              style: const TextStyle(fontSize: 14.5, color: Colors.black87, height: 1.4),
            ),
            const SizedBox(height: 12),
            const Divider(height: 1, color: Color(0xFFEEEEEE)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: const [
                _ActionButton(icon: Icons.thumb_up_alt_outlined, label: 'Like'),
                _ActionButton(icon: Icons.comment_outlined, label: 'Comment'),
                _ActionButton(icon: Icons.repeat_rounded, label: 'Repost'),
                _ActionButton(icon: Icons.send_rounded, label: 'Send'),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final IconData icon;
  final String label;

  const _ActionButton({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {},
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
        child: Row(
          children: [
            Icon(icon, size: 20, color: Colors.black54),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(color: Colors.black54, fontSize: 13, fontWeight: FontWeight.w600),
            ),
          ],
        ),
      ),
    );
  }
}
