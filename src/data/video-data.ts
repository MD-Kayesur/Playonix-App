export interface VideoDataItem {
  id: string;
  url: string;
  username: string;
  avatar: string;
  rating: string;
  description: string;
  likes: string;
  comments: string;
  shares: string;
  buttonText: string;
  clickUrl: string;
}

export const VIDEOS: VideoDataItem[] = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    username: 'Energy Casino',
    avatar: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=100&auto=format&fit=crop',
    rating: '4.4 (2 Reviews)',
    description: 'The casino holds an MGA license and also offers a fully Finnish-language interface! **100% bonus up to €200 + 400 free spins**',
    likes: '4.4',
    comments: '2',
    shares: '0',
    buttonText: 'Claim Bonus',
    clickUrl: 'https://playonix.gg/bonus/energy',
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    username: 'Playonix Sports',
    avatar: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&auto=format&fit=crop',
    rating: '4.8 (12 Reviews)',
    description: 'Get ready for the ultimate cyberpunk sports betting experience. Real-time odds and 100% match deposit bonus up to $500!',
    likes: '4.8',
    comments: '12',
    shares: '3',
    buttonText: 'Play Now',
    clickUrl: 'https://playonix.gg/sports',
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    username: 'Vegas Slots',
    avatar: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop',
    rating: '4.2 (8 Reviews)',
    description: 'Spin to win! Over 500+ slot games with progressive jackpots. Sign up today and get 200 free spins instantly.',
    likes: '4.2',
    comments: '8',
    shares: '1',
    buttonText: 'Spin Now',
    clickUrl: 'https://playonix.gg/slots',
  },
  {
    id: '4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    username: 'Live Blackjack',
    avatar: 'https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=100&auto=format&fit=crop',
    rating: '4.6 (15 Reviews)',
    description: 'Play live blackjack with professional dealers. 24/7 streaming, interactive chat, and special cashback deals.',
    likes: '4.6',
    comments: '15',
    shares: '4',
    buttonText: 'Join Table',
    clickUrl: 'https://playonix.gg/live',
  },
  {
    id: '5',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    username: 'Cyber Poker',
    avatar: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=100&auto=format&fit=crop',
    rating: '4.9 (24 Reviews)',
    description: 'Welcome to the high-stakes cyber poker lounge. Play against players worldwide with instant cashouts and 100% rakeback!',
    likes: '4.9',
    comments: '24',
    shares: '7',
    buttonText: 'Get Chips',
    clickUrl: 'https://playonix.gg/poker',
  }
];
