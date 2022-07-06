import React from 'react';
import Player from './Player';
import mux from 'mux-embed';
import clpp from '../../clpp/clpp';
import './App.css';
import useAuth from '../auth/useAuth';

export default function CastLabsPage(props) {

  const { movie } = props;
  const { user, authToken } = useAuth();

  const progress = 0;
  const mainfest = {
    source: [
      {
        url: authToken ? movie?.dashUrl : movie?.trailerDashUrl,
        type: clpp.Type.DASH,
        drmProtected: true
      },
      {
        url: authToken ? movie?.hlsUrl : movie?.trailerHlsUrl,
        type: clpp.Type.HLS,
        drmProtected: true
      }
    ],
    drm: {
      env: "DRMtoday_STAGING",
      customData: {
        userId: authToken ? (`fiftyflicks.` + user?.email) : 'purchase', // purchase
        sessionId: authToken ? user?.authToken : 'p0', // p0
        merchant: "bingeent",
      }
    },
    muxdata: {
      muxLib: mux,
      envKey: 'tnlqkfmqabaui616bq6m0j33g',
      muxOptionsOverride: { 
        debug: true,
        data: {
          
          // Site Metadata
          viewer_user_id: authToken ? (user?.email) : 'purchase', // ex: '12345'
          experiment_name: 'N/A',
          sub_property_id: 'N/A',

          // Player Metadata
          player_name: 'Fifty Flicks Castlabs',
          player_version: 'dev_1.0.0',
          player_init_time: '00:00',
          
          // Video Metadata
          video_id: movie.id,
          video_title: movie.titleName,
          video_series: 'N/A',
          video_duration: movie.duration,
          video_stream_type: 'on-demand',
          video_cdn: 'CloudFront'
        },
        automaticErrorTracking: false,
        respectDoNotTrack: false,
      }
    }
  }

  return (
    <div className='castLab relative'>
      <div style={{ width: '100%' }}>
        <Player
          config={{
            autoplay: true,
            license: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1cmxzIjpbImh0dHBzOi8vd3d3LnZ1Z29zdHJlYW0ubmV0IiwiaHR0cHM6Ly92dWdvc3RyZWFtLm5ldCJdLCJ0eXBlIjoiV2ViIiwia2lkIjozMDg2LCJpbHYiOmZhbHNlfQ.WeoErf8fjllzsrkXy34xd-GjvzNFT7x64ODwvjdIzr0DO1L_F418AhfR7REHGyJdumyR7Z52omi_T5hTcnLLK_T5tpY3tu8HVkju_8d24w0oCcsb9tly-XQK80860k2wapZZGlWhi8cn0CVKKGRP8hF6C769NoI2Pdhr4pLAzbUK6BXpC_EpSPjtzcGsIAegU4EEccj-KXTATLxuj8abGHfgQzOoKQ_C8L-vReyNtdLddIxw8anb168-8ehSX7lJWrTh0BMEHL4dH6Kp3vGaQigmX872dHBa_DLIbsDK8Ydszk__bX59MfMgk3RuZn_3exdPO_sYsljbMxAzvoNmeg'
          }}
          src={mainfest}
          progress={progress}
          title={movie.titleName}
        />
      </div>
    </div>
  );
}