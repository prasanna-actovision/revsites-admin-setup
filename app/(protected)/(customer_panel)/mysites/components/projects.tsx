'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { MySitesProjectCardRow } from '@/app/components/partials/cards/_mysites_project_card_row';
import { MySitesProjectCard } from '@/app/components/partials/cards/_mysites_project_card';
import { useCreateProjectMutation, useGetProjectsQuery } from '@/store/api/projectApi';

interface IProjectsItem {
  status: {
    variant?:
    | 'primary'
    | 'destructive'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | null
    | undefined;
    label: string;
  };
  logo: string;
  title: string;
  description: string;
  team: {
    size: string;
    group: Array<{ filename?: string; variant?: string; fallback?: string }>;
  };
  statistics: Array<{ total: string; description: string }>;
  progress: {
    variant: string;
    value: number;
  };
}
interface ProjectData {
  id: number;
  customer_details_id: number;
  project_category_id: number;
  project_domain_id: number;
  project_page_share_id: number | null;
  project_name: string;
  favicon_path: string | null;
  meta_tags: string;
  robot_text: string;
  notes: string | null;
  docker_port: number;
  server_cname: string;
  site_id: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  desciption: string;
  short_description: string;
  domain_name: string;
  project_category: {
    category_name: string;
  };
}

// type IProjectsItems = Array<ProjectData>;

const Projects = () => {
  const { data: projectsData, isLoading } = useGetProjectsQuery();
  // const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();
  const [activeView, setActiveView] = useState('list');

  useEffect(()=>{
    console.log("71",projectsData?.data);
  },[projectsData?.data])


  const renderProject = (project: ProjectData, index: number) => {
    return (
      <MySitesProjectCard
        status={project.status}
        logo={project.favicon_path}
        title={project.project_name}
        description={project.domain_name}
        // statistics={project.statistics}
        url={project.domain_name}
        key={index}
      />
    );
  };

  const renderItem = (project: ProjectData, index: number) => {
    return (
      <MySitesProjectCardRow
        status={project.status}
        logo={project.favicon_path}
        title={project.project_name}
        description={project.domain_name}
        // statistics={project.statistics}
        url="#"
        key={index}
      />
    );
  };

  return (
    <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
      <div className="flex flex-wrap items-center gap-5 justify-between">
        <h3 className="text-lg text-mono font-semibold">
          {Array.isArray(projectsData) && projectsData.length} Projects
        </h3>
        <ToggleGroup
          type="single"
          variant="outline"
          value={activeView}
          onValueChange={(value) => {
            if (value) setActiveView(value);
          }}
        >
          <ToggleGroupItem value="cards">
            <LayoutGrid size={16} />
          </ToggleGroupItem>
          <ToggleGroupItem value="list">
            <List size={16} />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      {activeView === 'cards' && (
        <div id="projects_cards">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7.5">
            {Array.isArray(projectsData?.data) && projectsData?.data?.map((project, index) => {
              return renderProject(project, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Button mode="link" underlined="dashed" asChild>
              <Link href="#">Show more projects</Link>
            </Button>
          </div>
        </div>
      )}
      {activeView === 'list' && (
        <div id="projects_list">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            {Array.isArray(projectsData?.data) && projectsData?.data?.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>
          <div className="flex grow justify-center pt-5 lg:pt-7.5">
            <Button mode="link" underlined="dashed" asChild>
              <Link href="#">Show more projects</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Projects, type IProjectsItem, type IProjectsItems };
