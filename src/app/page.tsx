
import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Sprout, Tractor } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AppLogo } from '@/components/logo';
import { UserAuthDropdown } from '@/components/user-auth-dropdown';
import { Input } from '@/components/ui/input';

const features = [
  {
    icon: <Tractor className="h-10 w-10 text-primary" />,
    title: 'Direct Farmer Income',
    description: 'Eliminating middlemen to ensure farmers get the compensation they deserve for their hard work.',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'QR Traceability',
    description: 'Scan a QR code on your product to see its entire journey from the farm to your table.',
  },
  {
    icon: <Leaf className="h-10 w-10 text-primary" />,
    title: 'Transparency',
    description: 'Complete visibility into the supply chain, from farming methods to logistics.',
  },
  {
    icon: <Sprout className="h-10 w-10 text-primary" />,
    title: 'Digital Bharat Ready',
    description: 'Empowering farmers with technology to participate in the digital economy.',
  },
];


export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-banner');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <AppLogo className="h-8 w-auto text-primary" />
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/consumer" className="transition-colors hover:text-primary">Marketplace</Link>
            <Link href="#" className="transition-colors hover:text-primary">About Us</Link>
            <Link href="#" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
          <div className="flex-1 flex justify-end">
             <div className="relative hidden lg:block w-full max-w-xs">
              <Input placeholder="Search for fresh produce..." className="w-full" />
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
             <UserAuthDropdown />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] md:h-[80vh]">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="relative container h-full flex flex-col items-center justify-center text-center text-white space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-shadow-lg">
              KrishiSaarthi
            </h1>
            <p className="text-lg md:text-2xl max-w-3xl text-shadow">
              Fair Prices | Trusted Food | Transparent Supply
            </p>
             <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
               <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/farmer">
                  Join as Farmer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button asChild size="lg" variant="secondary">
                <Link href="/consumer">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
               <Button asChild size="lg" variant="ghost" className="bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm">
                 <Link href="/business">
                  Business Orders
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Why KrishiSaarthi?</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                We are building a future where technology empowers farmers and consumers alike.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow bg-card">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="py-12 md:py-24 bg-primary text-primary-foreground">
            <div className="container text-center">
                 <h2 className="text-3xl md:text-4xl font-bold">Join Our Platform Today!</h2>
                <p className="mt-2 max-w-2xl mx-auto opacity-90">
                    Whether you're a farmer looking to get fair prices or a consumer wanting fresh, traceable food, KrishiSaarthi is for you.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/signup">Register as a Farmer</Link>
                    </Button>
                     <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                         <Link href="/consumer">Start Shopping</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-secondary text-secondary-foreground">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
                <AppLogo className="h-8 w-auto text-primary" />
                 <p className="mt-2 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} KrishiSaarthi. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
                <Link href="#" className="text-sm hover:text-primary transition-colors">Contact</Link>
                <Link href="#" className="text-sm hover:text-primary transition-colors">Help</Link>
                <Link href="#" className="text-sm hover:text-primary transition-colors">Terms of Service</Link>
                <Link href="#" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
