import { getServerSession } from "@/lib/session";
import ProfileForm from "@/components/dashboard/ProfileForm";

const ProfilePage = async () => {
  const { user } = await getServerSession();

  return (
    <div className="px-5 md:px-8 py-8 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="mb-8">
          <h2 className="text-[15px] font-sans font-semibold text-foreground tracking-[-0.01em]">
            Profile
          </h2>
          <p className="mt-1 text-[13px] font-sans text-muted-foreground">
            Manage your public profile and account settings.
          </p>
        </div>

        <ProfileForm user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
