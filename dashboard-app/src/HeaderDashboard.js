import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { PieChart, Pie, Tooltip } from 'recharts';

function HeaderDashboard(){
  const [dashboard, setDashboard] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3001/getDashboard")
    .then(dashboard=>{
      //console.log(dashboard.data)
      setDashboard(dashboard.data)})
    .catch(err=>console.log(err))
  }, [])
  var data = [];
  var lookup = {};
  var items = dashboard;
  var result = [];
  
  for (var item, i = 0; item = items[i++];) {
    var sector = item.sector;
    var intensity = item.intensity;
    if (!(sector in lookup) && sector !== '') {
      lookup[sector] = 1;
      result.push({name:sector,value:intensity});
    }
  }
  data = result;
  return (<>
    <h3>DASHBOARD | Data Count - {dashboard.length}</h3>
    {/* <table border="1">
    <thead>
      <tr>
        <th>Sector</th>
        <th>Topic</th>
        <th>Intensity</th>
        <th>Relevance</th>
        <th>Likelihood</th>
      </tr>
      </thead>
      <tbody>
      {
        dashboard.map((x,i)=>{
         return <tr key={i}>
            <td>{x.sector}</td>
            <td>{x.topic}</td>
            <td>{x.intensity}</td>
            <td>{x.relevance}</td>
            <td>{x.likelihood}</td>
          </tr>
        })
      }
      </tbody>
    </table> */}
    <div className='center'>
        <PieChart width={500} height={500}>
          <Pie data={data} dataKey="value" isAnimationActive="false" cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
          <Tooltip/>
        </PieChart>
    </div>
    </>
  );
}

export default HeaderDashboard;
