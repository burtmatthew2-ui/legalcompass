-- Insert admin role for the user
INSERT INTO public.user_roles (user_id, role)
VALUES ('88ec578c-8dc2-4736-8ca1-bb17c5777812', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;