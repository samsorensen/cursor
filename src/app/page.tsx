import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Film, Rocket, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import heroImage from '../../images/hero-image.png'

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80 sticky top-0 z-50">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            SciFi Stream
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Home
          </Link>
          <Link href="/movies" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Movies
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            About
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Contact
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit bg-blue-500/20 text-blue-300 border-blue-500/30">
                    <Star className="w-3 h-3 mr-1" />
                    Popular Sci-Fi Movies
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Explore the Universe of Science Fiction
                  </h1>
                  <p className="max-w-[600px] text-slate-300 md:text-xl">
                    Discover the most popular science fiction movies, from classic space operas to cutting-edge
                    cyberpunk. Stream unlimited sci-fi content with our premium collection.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Film className="w-4 h-4 mr-2" />
                    Start Watching
                  </Button>
                  <Link href="/movies">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                    >
                      Browse Movies
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl lg:order-last">
                <Image
                  src={heroImage}
                  width="600"
                  height="400"
                  alt="Science Fiction Movies Collage"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-800/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose SciFi Stream?</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The ultimate destination for science fiction enthusiasts with curated content and premium features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/20">
                  <Star className="h-8 w-8 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Curated Collection</h3>
                  <p className="text-slate-300">
                    Hand-picked selection of the best science fiction movies from all eras and subgenres.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20">
                  <Zap className="h-8 w-8 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">4K Streaming</h3>
                  <p className="text-slate-300">
                    Experience your favorite sci-fi movies in stunning 4K quality with Dolby Atmos sound.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <Film className="h-8 w-8 text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Exclusive Content</h3>
                  <p className="text-slate-300">
                    Access to rare sci-fi gems, director's cuts, and behind-the-scenes content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Subscription</h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Select the perfect plan for your sci-fi movie streaming needs.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-3 md:gap-8 max-w-6xl mx-auto">
              {/* Basic Plan */}
              <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Explorer</CardTitle>
                  <CardDescription className="text-slate-300">Perfect for casual sci-fi fans</CardDescription>
                  <div className="text-3xl font-bold">
                    $9.99<span className="text-base font-normal text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Access to 500+ sci-fi movies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">HD streaming quality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">1 device at a time</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Mobile & tablet access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline">
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Popular Plan */}
              <Card className="bg-gradient-to-b from-blue-700/50 to-purple-700/50 border-blue-500 text-white relative">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600">
                  Most Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-xl">Voyager</CardTitle>
                  <CardDescription className="text-slate-500">Best value for true sci-fi enthusiasts</CardDescription>
                  <div className="text-3xl font-bold">
                    $19.99<span className="text-base font-normal text-slate-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Access to 1000+ sci-fi movies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">4K Ultra HD streaming</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">3 devices simultaneously</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">All devices + Smart TV</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Exclusive director's cuts</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Start Free Trial
                  </Button>
                </CardFooter>
              </Card>

              {/* Premium Plan */}
              <Card className="bg-slate-800/50 border-slate-700 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Commander</CardTitle>
                  <CardDescription className="text-slate-300">Ultimate experience for collectors</CardDescription>
                  <div className="text-3xl font-bold">
                    $29.99<span className="text-base font-normal text-slate-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Complete sci-fi library</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">4K + Dolby Atmos</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Unlimited devices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Download for offline viewing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Behind-the-scenes content</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Early access to new releases</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-transparent" variant="outline">
                    Go Premium
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Explore the Galaxy?</h2>
                <p className="max-w-[600px] text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of sci-fi fans and start your journey through the cosmos of cinema today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Start Your Free Trial
                </Button>
                <Link href="/movies">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
                  >
                    Browse Movies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-slate-700/50 bg-slate-900/80">
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} SciFi Stream. All rights reserved.</p>
        <div className="sm:ml-auto flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
          <p className="text-xs text-slate-400">
            Movie data provided by{" "}
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              The Movie Database (TMDb)
            </Link>
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-slate-400 hover:text-slate-300">
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
