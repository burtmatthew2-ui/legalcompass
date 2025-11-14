import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface LeadFiltersProps {
  onFilterChange: (filters: FilterValues) => void;
}

export interface FilterValues {
  practiceArea: string;
  urgency: string;
  state: string;
  searchTerm: string;
}

export const LeadFilters = ({ onFilterChange }: LeadFiltersProps) => {
  const [filters, setFilters] = useState<FilterValues>({
    practiceArea: "all",
    urgency: "all",
    state: "all",
    searchTerm: ""
  });

  const updateFilter = (key: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Leads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Search</Label>
            <Input
              placeholder="Search cases..."
              value={filters.searchTerm}
              onChange={(e) => updateFilter("searchTerm", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Practice Area</Label>
            <Select value={filters.practiceArea} onValueChange={(v) => updateFilter("practiceArea", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="Family Law">Family Law</SelectItem>
                <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                <SelectItem value="Real Estate">Real Estate</SelectItem>
                <SelectItem value="Personal Injury">Personal Injury</SelectItem>
                <SelectItem value="Business Law">Business Law</SelectItem>
                <SelectItem value="Employment Law">Employment Law</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Urgency</Label>
            <Select value={filters.urgency} onValueChange={(v) => updateFilter("urgency", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select value={filters.state} onValueChange={(v) => updateFilter("state", v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

import { useState } from "react";