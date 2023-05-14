import React, { useEffect, useState } from 'react';
import Histogram from 'react-chart-histogram';
import './App.css';

function App() {
  
  /*const data = [324, 45, 672];*/
  const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };


  const [substart,setsub] = useState(false);

  const [wordFrequency, setWordFrequency] = useState([]);

  useEffect(() => {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then(response => response.text())
      .then(text => {
        const words = text.split(/\W+/);
        const frequencyMap = {};
        for (let i = 0; i < words.length; i++) {
          const word = words[i].toLowerCase();
          if (word.length > 0) {
            frequencyMap[word] = frequencyMap[word] ? frequencyMap[word] + 1 : 1;
          }
        }
        const wordFrequencyArray = [];
        for (let word in frequencyMap) {
          wordFrequencyArray.push({ word: word, frequency: frequencyMap[word] });
        }
        wordFrequencyArray.sort((a, b) => b.frequency - a.frequency);
        setWordFrequency(wordFrequencyArray.slice(0, 20));
      });
  }, []);
  
  console.log("wordFrequency: ",wordFrequency);
  /*const labels = ['2016', '2017', '2018'];*/
  
  const labels = wordFrequency.map((x)=> x.word);
  const data= wordFrequency.map((x)=> x.frequency)

  function downloadCsv() {
    const csvData = wordFrequency.map((row) => Object.values(row).join(",")).join("\n");
    console.log(csvData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    return url;
    
  }

  return (
    <div className="App">
      <div className='app-container-first-div'>
      <button className={substart?'non-active-submit':'app-submit'} onClick={()=>setsub(!substart)}>Submit</button>
      </div>
      
      <div className={substart?"active-second-con":"non-active-second"}>
            <div className="histogram">
            <div className="histogram-label">Histogram</div>
            <Histogram
                xLabels={labels}
                yValues={data}
                width='600'
                height='400'
                options={options}
                barClassName="histogram-bar"
            />
          </div>
          <div className='display-download-btns'>
            <button className='app-submit' onClick={()=>setsub(!substart)}>Close</button>
            <button className='app-submit' ><a href={downloadCsv()} download="data.csv">Download CSV</a></button>
          </div>
      </div>
    </div>
  );
}

export default App;
