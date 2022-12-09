import { useLoaderData } from 'react-router-dom';

type Profile = {
  id: string;
};

type LoaderProps = {
  request?: Object;
  params: Profile;
};

export const loader = async ({ params: { id } }: LoaderProps) => {
  return { id };
};

const Profile = () => {
  const profile = useLoaderData() as Profile;
  return <h1>{profile.id}</h1>;
};

export default Profile;
