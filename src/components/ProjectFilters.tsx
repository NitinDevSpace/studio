'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, XCircle } from 'lucide-react';

interface ProjectFiltersProps {
  techStacks: string[];
  categories: string[];
  selectedTechStacks: string[];
  selectedCategory: string;
  onTechStackChange: (techStack: string) => void;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const ALL_CATEGORIES_OPTION_VALUE = "__ALL_CATEGORIES__";

export default function ProjectFilters({
  techStacks,
  categories,
  selectedTechStacks,
  selectedCategory,
  onTechStackChange,
  onCategoryChange,
  onClearFilters,
}: ProjectFiltersProps) {
  return (
    <Card className="mb-10 shadow-xl bg-card/70 backdrop-blur-xl border-border/40 rounded-xl">
      <CardHeader className="p-5 sm:p-6 border-b border-border/30">
        <CardTitle className="font-headline text-xl sm:text-2xl flex items-center text-primary">
          <Filter className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
          Filter Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 sm:p-6 space-y-6">
        <div>
          <Label className="text-md font-semibold mb-3 block text-foreground/90">Tech Stack</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-3">
            {techStacks.map((tech) => (
              <div key={tech} className="flex items-center space-x-2.5 group">
                <Checkbox
                  id={`tech-${tech}`}
                  checked={selectedTechStacks.includes(tech)}
                  onCheckedChange={() => onTechStackChange(tech)}
                  className="border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground rounded transition-all duration-200"
                />
                <Label 
                  htmlFor={`tech-${tech}`} 
                  className="font-normal cursor-pointer text-sm text-foreground/80 group-hover:text-primary transition-colors"
                >
                  {tech}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-end pt-2">
          <div>
            <Label htmlFor="category-select" className="text-md font-semibold mb-2 block text-foreground/90">Category</Label>
            <Select
              value={selectedCategory === '' ? ALL_CATEGORIES_OPTION_VALUE : selectedCategory}
              onValueChange={(value) => {
                if (value === ALL_CATEGORIES_OPTION_VALUE) {
                  onCategoryChange('');
                } else {
                  onCategoryChange(value);
                }
              }}
            >
              <SelectTrigger id="category-select" className="w-full bg-input border-border/70 focus:ring-2 focus:ring-primary focus:border-primary shadow-sm rounded-lg py-2.5 text-base">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border/70 backdrop-blur-md">
                <SelectItem value={ALL_CATEGORIES_OPTION_VALUE} className="focus:bg-accent/50 hover:bg-accent/30 transition-colors duration-150 py-2">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="focus:bg-accent/50 hover:bg-accent/30 transition-colors duration-150 py-2">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="w-full md:w-auto text-sm border-destructive/60 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors duration-200 shadow-sm hover:shadow-destructive/20 rounded-lg py-2.5"
            disabled={selectedTechStacks.length === 0 && selectedCategory === ''}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
