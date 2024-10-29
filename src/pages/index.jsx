import '../assets/page.css'
import { ImSpinner10 } from "react-icons/im";
import JsEditor from './editor';
import { MdPlayCircleOutline } from 'react-icons/md';
import { FaPlay, FaTruckLoading } from "react-icons/fa";
import { RiLoader2Line } from "react-icons/ri";
import loader from '../assets/loading.gif'
import { useState } from 'react';
import { TiTick } from "react-icons/ti";
import { PiSticker } from "react-icons/pi";
import { useGiraf } from '../giraff';
import challenges from './questions';
import challengeTime from './challengeTime';
import { TbAlertTriangle } from "react-icons/tb";

const Landing = () => {
    const { gHead, addGHead } = useGiraf()
    const [loading, setLoading] = useState(false)
    const [played, setPlayed] = useState(false)
    const [locked, setLocked] = useState(false)
    const [error, setError] = useState(false)
    const [tries, setTries] = useState(0)
    const [scored, setScored] = useState(0)
    const [gained, setGained] = useState(0)

  const [testResults, setTestResults] = useState([]);
  
    const shuffleCode = (v) => {
        if(!v){
            if (!loading || tries == 3) return setError(t => {
                setTimeout(() => {
                    setError(false)
                }, 3000);
                return true
            })
            setTries(t => {
            return t + 1
        })}else{
            console.log('in else')
        }
        let random = parseInt(Math.random() * 50) + 1
        let index = 0
        const interval = setInterval(() => {

            addGHead('current_code', challenges.filter(l => l.level == gHead.level)[index])
            index++
            if (index >= random) {
                clearInterval(interval)
            }
        }, 100)
    }
    const runTests = (userFunction, tests) => {
        
        let results = [];
        console.log(gHead.current_code)
        tests.forEach(({ input, output }, index) => {
          try {
            const result = userFunction(...input); 
            const passed = JSON.stringify(result) === JSON.stringify(output);
            results.push({ passed, input, expected: output, received: result });
            if(passed){
            setScored(t=>{
                return t+1
            })
            }
          } catch (error) {
            results.push({ passed: false, error: error.message });

          }
        });
        return results;
      };

      const runUserCode = () => {
        if (!loading) return setError(t => {
            setTimeout(() => {
                setError(false)
            }, 3000);
            return true
        })

        setGained(t=>{
            return t+1
        })
        try {
          const userFunction = eval(`(${gHead.code})`);
          
          const results = runTests(userFunction, gHead.current_code.tests);
          setTestResults(results);
          console.log('here ;',results)

        // console.log('user', results)
        } catch (error) {
            console.log(error)
          setTestResults([{ passed: false, error: `Code Error: ${error.message}` }]);
        }
        shuffleCode('valid')

      };
      
    return (
        <div className="page">
            {error && <div className='warning'>
                <p>Your code is locked</p>
            </div>}
            <div className="left">
                <div className='banner'>
                    <div className='logo'></div>
                    <p>Question Mark?</p>
                </div>
                <div className='code-base'>
                    <div className='header'>
                        <p></p>
                        <p></p>
                        <p onClick={()=>{
                            runUserCode()
                        }}></p>
                        <p className='title'>Title : {gHead.current_code?.title || 'Name Of Code'}</p>
                        <ImSpinner10 className='p' onClick={() => {
                            shuffleCode()
                        }} />
                    </div>
                    <p style={{
                        marginTop: '-10px'
                    }}></p>
                    <div className='code-editor'>
                        <JsEditor />
                    </div>
                    {testResults.length > 0 &&<div className='results' style={{
                        color:testResults.filter(l=>l.passed).length > 0 ?'green':'red'
                    }}>
                    {testResults.filter(l=>l.passed).length > 0 ? <TiTick/>:<TbAlertTriangle />}
                    <p> {testResults.filter(l=>l.passed).length > 0 ? 'Passed':'Failed'}</p>
                    </div>}
                </div>
            </div>
            <div className="right">
                <div className='play'>
                    <div className='pload'>
                        {played ? <TiTick className='icon loading' style={
                            {
                                fontSize: '55px'
                            }
                        } /> :
                            <>
                                {!loading ? <FaPlay className='icon' onClick={() => {
                                    setLoading(true)
                                    setGained(t=>{
                                        return t-1
                                    })
                                    addGHead('readOnly', false)
                                    setTimeout(() => {
                                        setLoading(false)
                                        setTries(0)
                                        addGHead('readOnly', true)
                                    }, challengeTime[gHead.level] * 1000)
                                }} /> :
                                    <img src={loader} style={{
                                        height: '70px'
                                    }} />}
                            </>
                        }
                    </div>
                </div>
                <div className='blender'>
                    <div className='score'>Gained {parseInt(Math.sqrt(gained,2)).toString().padStart(2,'0')}</div>
                    <div className='score'>Scored {scored.toString().padStart(2,'0')}</div>
                </div>
                <div className='sticker'>
                    <p className='stick' >{tries}</p>
                </div>
            </div>

        </div>
    )
}

export default Landing