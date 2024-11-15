import { NavBar } from '../components/NavBar';
import Image from 'next/image';
import Link from 'next/link';

interface ArticleProps {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

const FeaturedArticle = ({ title, description, imageUrl, category }: ArticleProps) => (
  <div className="relative border-b border-gray-200 pb-6">
    <span className="text-sm font-bold text-blue-700">{category}</span>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative h-[400px]">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-serif font-bold mb-4">{title}</h1>
        <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const ArticleCard = ({ title, description, imageUrl, category }: ArticleProps) => (
  <div className="border-b border-gray-200 pb-6">
    <span className="text-sm font-bold text-blue-700">{category}</span>
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <h2 className="text-xl font-serif font-bold mb-2">{title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="relative h-[150px]">
        <Image 
          src={imageUrl} 
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Article */}
        <FeaturedArticle 
          category="Politics"
          title="Major Policy Shift Announced in Washington"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
          imageUrl="/images/placeholder.jpg"
        />

        {/* Grid of Articles */}
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="space-y-8">
            <ArticleCard 
              category="Technology"
              title="New AI Breakthrough Changes Industry"
              description="Researchers announce groundbreaking development in artificial intelligence..."
              imageUrl="/images/tech.jpg"
            />
            <ArticleCard 
              category="Business"
              title="Market Report: Stocks Surge"
              description="Global markets respond positively to new economic data..."
              imageUrl="/images/business.jpg"
            />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <ArticleCard 
              category="World"
              title="International Summit Concludes"
              description="World leaders reach historic agreement on climate change..."
              imageUrl="/images/world.jpg"
            />
            <ArticleCard 
              category="Sports"
              title="Championship Finals Set"
              description="Teams prepare for ultimate showdown in season finale..."
              imageUrl="/images/sports.jpg"
            />
          </div>

          {/* Right Column - Opinion/Featured */}
          <div className="bg-gray-50 p-6">
            <h3 className="text-xl font-bold mb-6 border-b border-gray-300 pb-2">
              Today's Highlights
            </h3>
            <div className="space-y-6">
              {/* Add opinion pieces or featured content here */}
              <div className="space-y-4">
                <Link href="#" className="block hover:text-blue-600">
                  <h4 className="font-bold">Opinion: The Future of Democracy</h4>
                  <p className="text-sm text-gray-600">By John Smith</p>
                </Link>
                <Link href="#" className="block hover:text-blue-600">
                  <h4 className="font-bold">Analysis: Economic Trends</h4>
                  <p className="text-sm text-gray-600">By Jane Doe</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}