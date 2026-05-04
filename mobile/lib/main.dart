import 'package:provider/provider.dart';
import 'services/api_service.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ApiService(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

    return MaterialApp(
      title: 'FindWorker',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF0A66C2),
          primary: const Color(0xFF0A66C2),
          secondary: const Color(0xFF0073B1),
          surface: Colors.white,
          background: const Color(0xFFF3F2EF), // LinkedIn-style light grey background
        ),
        scaffoldBackgroundColor: const Color(0xFFF3F2EF),
        appBarTheme: const AppBarTheme(
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
          elevation: 0,
          centerTitle: false,
          titleTextStyle: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        cardTheme: CardTheme(
          color: Colors.white,
          elevation: 0,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8),
            side: const BorderSide(color: Color(0xFFE0E0E0), width: 0.5),
          ),
        ),
        inputDecorationTheme: InputDecorationTheme(
          filled: true,
          fillColor: Colors.white,
          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(8),
            borderSide: const BorderSide(color: Color(0xFF0A66C2), width: 2),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: const Color(0xFF0A66C2),
            foregroundColor: Colors.white,
            minimumSize: const Size(double.infinity, 48),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
            ),
            textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
          ),
        ),
      ),
      home: apiService.isLoggedIn ? const MainLayout() : const AuthScreen(),
      routes: {
        '/login': (context) => const AuthScreen(),
        '/home': (context) => const MainLayout(),
      },
    );
  }
}

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    final apiService = Provider.of<ApiService>(context);
    final isBusiness = apiService.role == 2;

    final List<Widget> screens = isBusiness 
      ? [
          const HomeScreen(), // Businesses can also see the feed
          const NetworkScreen(),
          const Center(child: Text('Add Post')), // Placeholder for add post
          const CandidatesScreen(), // Candidates list for businesses
          const PostJobScreen(), // Job posting for businesses
        ]
      : [
          const HomeScreen(),
          const NetworkScreen(),
          const Center(child: Text('Add Post')),
          const MessagingScreen(),
          const JobsScreen(),
        ];

    return Scaffold(
      body: screens[_currentIndex],
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          border: Border(top: BorderSide(color: Color(0xFFE0E0E0), width: 0.5)),
        ),
        child: NavigationBar(
          height: 65,
          backgroundColor: Colors.white,
          indicatorColor: Colors.transparent,
          selectedIndex: _currentIndex,
          onDestinationSelected: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
          destinations: [
            const NavigationDestination(
              icon: Icon(Icons.home_outlined),
              selectedIcon: Icon(Icons.home_rounded, color: Color(0xFF0A66C2)),
              label: 'Home',
            ),
            const NavigationDestination(
              icon: Icon(Icons.people_outline_rounded),
              selectedIcon: Icon(Icons.people_rounded, color: Color(0xFF0A66C2)),
              label: 'Network',
            ),
            const NavigationDestination(
              icon: Icon(Icons.add_box_outlined),
              selectedIcon: Icon(Icons.add_box_rounded, color: Color(0xFF0A66C2)),
              label: 'Post',
            ),
            NavigationDestination(
              icon: Icon(isBusiness ? Icons.person_search_outlined : Icons.chat_bubble_outline_rounded),
              selectedIcon: Icon(isBusiness ? Icons.person_search_rounded : Icons.chat_bubble_rounded, color: const Color(0xFF0A66C2)),
              label: isBusiness ? 'Candidates' : 'Messaging',
            ),
            NavigationDestination(
              icon: Icon(isBusiness ? Icons.add_business_outlined : Icons.business_center_outlined),
              selectedIcon: Icon(isBusiness ? Icons.add_business_rounded : Icons.business_center_rounded, color: const Color(0xFF0A66C2)),
              label: isBusiness ? 'Post Job' : 'Jobs',
            ),
          ],
        ),
      ),
    );
  }
}
