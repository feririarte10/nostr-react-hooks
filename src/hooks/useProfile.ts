import { Profile } from "@/types/profile";
import { useEffect, useState } from "react";
import { useSubscription } from "./useSubscription";

interface UseProfileReturn {
  profile: Profile;
}

export const useProfile = (pubKey: string): UseProfileReturn => {
  const { events: userMetadata } = useSubscription({
    filters: [
      {
        kinds: [0],
        authors: [pubKey],
      },
    ],
    enabled: Boolean(pubKey.length),
  });
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    userMetadata.map((event) => {
      setProfile(JSON.parse(event.content) as Profile);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMetadata]);

  return { profile };
};

export default useProfile;