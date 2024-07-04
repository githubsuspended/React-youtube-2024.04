import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addWatchVideoRecord, getWatchVideoRecord, getWatchVideoCount } from '../api/firebase';

export default function useWatchVideo(user) {
  const queryClient = useQueryClient();
  const uid = user && user.uid;

  const getRecord = useQuery({
    queryKey: ['watchVideo'],
    queryFn: getWatchVideoRecord,
    staleTime: 1000 * 60 * 5
  });

  const getCount = useQuery({
    queryKey: ['watchVideo', uid],
    queryFn: () => getWatchVideoCount(uid),
    staleTime: 1000 * 60 * 5
  });

  const addRecord = useMutation({
    mutationFn: ({user, video}) => addWatchVideoRecord({user, video}),
    onSuccess: () => queryClient.invalidateQueries(['watchVideo', uid])
  });

  return { getRecord, getCount, addRecord };
}