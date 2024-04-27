import React, { useEffect, useState } from "react";
import { auth, db } from "../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

const UserPage = () => {
  const [data, setData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultRef = db.collection("Results");
    const { uid } = auth.currentUser;
    const tempData = [];
    const tempGraphData = [];

    resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setDataLoading(false);
        setGraphData(tempGraphData);
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading]);

  if (loading || dataLoading) {
    return (
      <div className="center-of-screen">
        <CircularProgress size={100} />
      </div>
    );
  }

  return (
    <div className="canvas">
      <UserInfo totalTestTaken={data.length} />
      <div className="graph-user-page">
        <Graph graphData={graphData} />
      </div>
      <div>
        <TableUserData data={data} />
      </div>
    </div>
  );
};

export default UserPage;
