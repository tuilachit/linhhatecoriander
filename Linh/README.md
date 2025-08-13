# Hey There! 👋 - A Cute Message For You

A super cute and fun website created with lots of smiles and dachshunds! This is a happy digital message designed to bring joy and maybe rekindle a friendship.

## Features

- 🐕 Floating dachshund dogs and paw prints everywhere!
- 💌 Fun and happy messages with cute emojis
- 🎥 Video message section for fun content
- 🎨 Adorable animations and transitions
- 📱 Fully responsive design
- 🔗 Supabase integration for future features

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Supabase** - Backend services

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd love-website
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Adding Your Video

1. Place your video file in the `public` folder
2. Update the `videoUrl` prop in `app/page.tsx`:
```tsx
<VideoMessage
  videoUrl="/your-video.mp4"
  title="Your Title"
  description="Your description"
/>
```

### Personalizing Messages

Edit the `happyMessages` array in `app/page.tsx` to include your own fun messages, memories, and inside jokes.

### Changing Colors

The cute color scheme can be customized in `tailwind.config.js` under the `colors` section.

## Supabase Integration

The project is configured with Supabase for potential future features like:
- User authentication
- Message storage
- Real-time updates
- File uploads

### Environment Variables

Create a `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://yfoabnlsnxxqkqlrqoua.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── FloatingDachshunds.tsx   # Animated dachshunds
│   ├── HappyMessage.tsx         # Message component
│   └── VideoMessage.tsx         # Video player
├── lib/
│   └── supabase.ts          # Supabase client
└── public/                  # Static assets
```

## Contributing

This is a personal project, but suggestions and improvements are welcome!

## License

This project is created with joy and is free to use for personal purposes.

---

Made with 💕 and lots of smiles! 😊🐕 

## Journal (Supabase)

Run this SQL in Supabase SQL editor to enable the journal feature:

```
create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  mood text not null,
  stress int not null check (stress between 0 and 10),
  notes text
);

alter table journal_entries enable row level security;

create policy "public can read" on journal_entries
for select using (true);

create policy "public can insert" on journal_entries
for insert with check (true);
``` 