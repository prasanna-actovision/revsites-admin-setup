import { baseApi } from './baseApi';

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

interface Project {
  status: number;
  message: string;
  responseCode: number;
  data?: ProjectData[];
}

interface CreateProjectPayload {
  name: string;
  description?: string;
}

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: list all projects
    getProjects: builder.query<Project, void>({
      query: () => '/customers/projects',
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((item) => ({
                type: 'Project' as const,
                id: item.id,
              })),
              { type: 'Project', id: 'LIST' },
            ]
          : [{ type: 'Project', id: 'LIST' }],
    }),

    // POST: create a project
    createProject: builder.mutation<Project, CreateProjectPayload>({
      query: (body) => ({
        url: '/customers/projects',
        method: 'POST',
        body, // JSON body automatically forwarded by proxy
      }),
      invalidatesTags: [{ type: 'Project', id: 'LIST' }], // invalidate to refetch list
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectApi;
