import React, {useEffect} from 'react';

const Adsense = ({client, slot}) => {

  const clientId = client || 'ca-pub-9901682981158669'
  const slotId = slot || '3637246505'

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
      <ins className="adsbygoogle"
           style={{display: 'block'}}
           data-ad-client={clientId}
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
  )
}

export default Adsense