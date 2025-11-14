import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, MapPin, Briefcase, Award, Filter, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface LawyerProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  bio: string | null;
  practice_areas: string[];
  states_licensed: string[];
  years_of_experience: number | null;
  profile_image_url: string | null;
  verified_status: boolean;
  average_rating: number;
  total_ratings: number;
  total_leads_purchased: number;
}

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", 
  "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
  "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", 
  "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", 
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
  "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
  "Wisconsin", "Wyoming"
];

const PRACTICE_AREAS = [
  "Family Law", "Criminal Defense", "Personal Injury", "Real Estate", "Business Law",
  "Immigration", "Employment Law", "Estate Planning", "Bankruptcy", "Intellectual Property",
  "Civil Rights", "Tax Law", "Environmental Law", "Health Care Law", "Education Law"
];

export default function FindLawyers() {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState<LawyerProfile[]>([]);
  const [filteredLawyers, setFilteredLawyers] = useState<LawyerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating");

  useEffect(() => {
    fetchLawyers();
  }, []);

  useEffect(() => {
    filterAndSortLawyers();
  }, [lawyers, searchQuery, selectedState, selectedPracticeArea, sortBy]);

  const fetchLawyers = async () => {
    try {
      const { data, error } = await supabase
        .from('lawyer_profiles')
        .select('*')
        .eq('verified_status', true)
        .order('average_rating', { ascending: false });

      if (error) throw error;
      setLawyers(data || []);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      toast.error('Failed to load attorneys');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortLawyers = () => {
    let filtered = [...lawyers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lawyer => 
        lawyer.full_name.toLowerCase().includes(query) ||
        lawyer.bio?.toLowerCase().includes(query) ||
        lawyer.practice_areas.some(area => area.toLowerCase().includes(query))
      );
    }

    // State filter
    if (selectedState !== "all") {
      filtered = filtered.filter(lawyer => 
        lawyer.states_licensed.includes(selectedState)
      );
    }

    // Practice area filter
    if (selectedPracticeArea !== "all") {
      filtered = filtered.filter(lawyer => 
        lawyer.practice_areas.includes(selectedPracticeArea)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.average_rating - a.average_rating;
        case "experience":
          return (b.years_of_experience || 0) - (a.years_of_experience || 0);
        case "cases":
          return b.total_leads_purchased - a.total_leads_purchased;
        default:
          return 0;
      }
    });

    setFilteredLawyers(filtered);
  };

  const handleRequestConsultation = async (lawyerId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please sign in to request a consultation");
      navigate("/auth");
      return;
    }

    // Navigate to case creation with pre-selected lawyer
    navigate("/user-portal", { state: { selectedLawyerId: lawyerId } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Find Lawyers - Legal Compass</title>
        <meta name="description" content="Browse verified attorneys by practice area and location. Read reviews and request consultations with experienced lawyers." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-white">
        <Navbar />
        
        <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Find Your Legal Expert
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse verified attorneys specializing in your legal needs. Compare experience, ratings, and request consultations.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <Input
                      placeholder="Search by name, practice area..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* State Filter */}
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="All States" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="all">All States</SelectItem>
                    {US_STATES.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Practice Area Filter */}
                <Select value={selectedPracticeArea} onValueChange={setSelectedPracticeArea}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Practice Areas" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="all">All Practice Areas</SelectItem>
                    {PRACTICE_AREAS.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div className="mt-4 flex items-center gap-4">
                <Filter className="w-4 h-4 text-slate-600" />
                <span className="text-sm text-slate-600">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="cases">Most Cases</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Count */}
          <p className="text-slate-600 mb-6">
            Showing {filteredLawyers.length} verified {filteredLawyers.length === 1 ? 'attorney' : 'attorneys'}
          </p>

          {/* Attorney Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLawyers.map((lawyer) => (
              <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {lawyer.profile_image_url ? (
                        <img 
                          src={lawyer.profile_image_url} 
                          alt={lawyer.full_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">
                            {lawyer.full_name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {lawyer.full_name}
                          {lawyer.verified_status && (
                            <Award className="w-4 h-4 text-primary" />
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium">
                            {lawyer.average_rating.toFixed(1)}
                          </span>
                          <span className="text-xs text-slate-500">
                            ({lawyer.total_ratings} {lawyer.total_ratings === 1 ? 'review' : 'reviews'})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <CardDescription className="mb-4 line-clamp-2">
                    {lawyer.bio || "Experienced attorney ready to help with your legal needs."}
                  </CardDescription>

                  {/* Practice Areas */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Briefcase className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Practice Areas</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.practice_areas.slice(0, 3).map((area, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      {lawyer.practice_areas.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lawyer.practice_areas.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Licensed States */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Licensed in</span>
                    </div>
                    <p className="text-sm text-slate-600">
                      {lawyer.states_licensed.slice(0, 2).join(", ")}
                      {lawyer.states_licensed.length > 2 && ` +${lawyer.states_licensed.length - 2} more`}
                    </p>
                  </div>

                  {/* Experience */}
                  {lawyer.years_of_experience && (
                    <p className="text-sm text-slate-600 mb-4">
                      {lawyer.years_of_experience} years of experience • {lawyer.total_leads_purchased} cases completed
                    </p>
                  )}

                  {/* CTA */}
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => navigate(`/attorney/${lawyer.user_id}`)}
                      variant="outline"
                      className="flex-1"
                    >
                      View Profile
                    </Button>
                    <Button 
                      onClick={() => handleRequestConsultation(lawyer.user_id)}
                      className="flex-1"
                    >
                      Request Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredLawyers.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-xl text-slate-600 mb-4">No attorneys found matching your criteria</p>
              <p className="text-slate-500">Try adjusting your filters or search terms</p>
            </Card>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
