import React from 'react';
import {useRouter} from "next/router";
import useSession from "../store/useSession";
import CircularUnderLoad from "../components/atoms/ProgressLoaders/CircularUnderLoad";
import {SessionProvider} from "../store/SessionContext";

const WithSession = ({requireSession, ...rest}) => {

  const router = useRouter();
  const session = useSession();

  if (requireSession) {
    if (session.stage < 2) {
      return <CircularUnderLoad></CircularUnderLoad>;

    } else if (session.stage == 2) {
      if (session.user == null) {
        return <CircularUnderLoad></CircularUnderLoad>;
      }

    } else if (session.stage == 3) {
      router.push("/signin");
    }
  }

  return (
      <SessionProvider value={session}>
        {rest.children}
      </SessionProvider>
  )

}

export default WithSession;