import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios";
import { 
  PieChart, 
  Pie, 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend 
} from 'recharts';

function Dashboard(){
  const [dashboard, setDashboard] = useState([])
  const [showTable, setShowTable] = useState(false)
  useEffect(()=>{
    axios.get("http://localhost:3001/getDashboard")
    .then(dashboard=>{
      //console.log(dashboard.data)
      setDashboard(dashboard.data)})
    .catch(err=>console.log(err))
  }, [])

  var data = [];
  const dataPie= DistinctData(dashboard, "sector", "piechart");
  const dataChart = DistinctData(dashboard, "topic", "barchart").filter(x=>x.amt > 20);
  const sectors = DistinctSectors(dashboard);

  for(let sector in sectors){
    data.push({name:sector,value:sectors[sector]});
  }

  return (<>
    <h3 className='heading'>DASHBOARD | Data Count - {dashboard.length}</h3>
    <div className='center'>
        <PieChart width={400} height={400}>
          <Pie data={data} dataKey="value" isAnimationActive="true" cx={200} cy={200} outerRadius={150} fill="#8884d8" label/>
          <Tooltip/>
        </PieChart>
        <span>Sector wise count from total {dashboard.length} data</span>
    </div>
    <hr/>
    <div className='center'>
        <BarChart
          width={1200}
          height={300}
          data={dataChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="likelihood" fill="#8884d8" />
          <Bar dataKey="relevance" fill="#82ca9d" />
        </BarChart>
    </div>
    <hr/>
    <input type='checkbox' id="tblCheckbox" onChange={()=>{setShowTable(!showTable)}}/><label>Show Table</label>
    <div className='center'>
      <table border="1" width="100%">
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
          showTable && dashboard.filter(x=>x.topic !== "" && x.sector !=="").map((x,i)=>{
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
      </table>
    </div>
    </>
  );
}

function DistinctData(items, distinctWith, createDataFor){
  var lookup = {};
  var result = [];
  var x, y;
  for (var item, i = 0; item = items[i++];) {
    if(distinctWith === "sector")
      x = item.sector;
    else if(distinctWith === "topic")
      x = item.topic;

    var intensity = item.intensity;
    var likelihood = item.likelihood;
    var relevance = item.relevance;

    if (!(x in lookup) && x !== '') {
      lookup[x] = 1;
      if(createDataFor === "piechart")
        result.push({name:x,value:intensity});
      else if(createDataFor === "barchart")
        result.push({name:x,likelihood:likelihood,relevance:relevance,amt:intensity});
    }
  }
  return result;
}

function DistinctSectors(items){
  var x;
  var lookup = {};
  for (var item, i = 0; item = items[i++];) {
    x = item.sector;
    if (!(x in lookup) && x !== '') {
      lookup[x] = 1;
    }
    else{
      if(x !== '')
        lookup[x] = lookup[x] + 1;
    }
  }
  return lookup;
}

export default Dashboard;
