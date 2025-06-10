
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
import { Filter } from 'lucide-react';

interface ProjectFiltersProps {
  techStacks: string[];
  categories: string[];
  selectedTechStacks: string[];
  selectedCategory: string;
  onTechStackChange: (techStack: string) => void;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

const ALL_CATEGORIES_OPTION_VALUE = "__ALL_CATEGORIES__"; // Sentinel value

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
    <Card className="mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Filter className="mr-2 h-5 w-5 text-primary" />
          Filter Projects
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-md font-semibold mb-2 block">Tech Stack</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {techStacks.map((tech) => (
              <div key={tech} className="flex items-center space-x-2">
                <Checkbox
                  id={`tech-${tech}`}
                  checked={selectedTechStacks.includes(tech)}
                  onCheckedChange={() => onTechStackChange(tech)}
                />
                <Label htmlFor={`tech-${tech}`} className="font-normal cursor-pointer text-sm">
                  {tech}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="category-select" className="text-md font-semibold mb-2 block">Category</Label>
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
            <SelectTrigger id="category-select" className="w-full sm:w-[280px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES_OPTION_VALUE}>All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <button
          onClick={onClearFilters}
          className="text-sm text-primary hover:underline"
        >
          Clear All Filters
        </button>
      </CardContent>
    </Card>
  );
}
