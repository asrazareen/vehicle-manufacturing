import "./Home.css"
import { React, useState, useEffect } from "react"
import loader from "./assets/loader.gif"

const Home = () => {
    const [data, setData] = useState([])
    const [type, setType] = useState([])
    const [country, setCountry] = useState([])
    const [Name, setName] = useState([])
    const [commonName, setCommonName] = useState([])
    const [click, setClick] = useState(false)
    const [i, setI] = useState(0)
    const [id, setId] = useState(0)
    const [priName,setPri] = useState("")
    const [address,setAddress] = useState("")
    const [position,setPosition] = useState("")
    const [state,setState] = useState("")
    const [search,setSearch] =useState("")
    const [searchfield,setSearchfield] = useState("")
    const [show,setShow] = useState(false)
 

    useEffect(() => {
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json")
            .then(res => res.json())
            .then(data => setData(data.Results))

    }, [])


    useEffect(() => {

        if (data !== []) {
            let name = []
            let comname = []
            let cont = []
            let typ = []
            let ids = []


            for (let i = 0; i < data.length; i++) {
                if (data[i].Country && data[i].Mfr_CommonName && data[i].Mfr_Name && data[i].VehicleTypes) {

                    for (let j = 0; j < data[i].VehicleTypes.length; j++) {

                        if (data[i].VehicleTypes[j].IsPrimary) {
                            name.push(data[i].Mfr_Name)
                            comname.push(data[i].Mfr_CommonName)
                            cont.push(data[i].Country)
                            typ.push(data[i].VehicleTypes[j].Name)
                            ids.push(data[i].Mfr_ID)
                        }
                    }


                }
            }
            setCommonName(comname)
            setName(name)
            setCountry(cont)
            setType(typ)
            setId(ids)


        }

    }, [data])


    const handleClick = async (i) => {
        setClick(true)
        const res =await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetManufacturerDetails/${id[i]}?format=json`)
       const response = await res.json()

       const data= await response.Results
       if(!data){
        return(
            <div>
                <img src={loader} alt="image" />
            </div>
        )
       }
       
       setI(i)
       setPri(data[0].PrincipalFirstName)
       setAddress(data[0].Address)
       setPosition(data[0].PrincipalPosition)
       setState(data[0].StateProvince)
 

    }
    return (
        <div className="main-con" >
            <h1 className="header" >Vehicle Manifacturers</h1>
            <div>
                <div className="search" >
                    <input type="text" placeholder="search..."
                    onChange={(e)=>{
                        setSearchfield(e.target.value)
                        if (e.target.value === "") {
                            setSearch([])
                            setShow(false)
                        }
                        else {
                            const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
                            let arr = commonName.filter((data) => {
                                return regex.test(data.toLowerCase()); 

                            });
                            setShow(true)
                            setSearch(arr)
                        }}} 
                    value={search} />
                    <select>
                        <option>All</option>
                        <option>Passenger Car</option>
                        <option>Multipurpose Passenger Vehicle (MPV)</option>
                        <option>Motorcycle</option>
                        <option>Low Speed Vehicle (LSV)</option>
                        <option>Incomplete Vehicle</option>
                        <option>Truck</option>
                    </select>
                </div>
            </div>
            <div className="table-con" >
                <div className="heading" >
                    Name
                </div  >
                <div className="heading" >
                    Country
                </div>
                <div className="heading" >
                    Type
                </div>
                <div className="name" >
                    
                    {
                        commonName.map((name, index) => {
                            return (
                                <div key={index} className="display"
                                    onClick={() => handleClick(index)}
                                >
                                    {name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="name" >
                    {
                        country.map((country, index) => {

                            return (
                                <div key={index} className="display"
                                    onClick={() => handleClick(index)}>
                                    {country}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="name" >
                    {
                        type.map((type, index) => {

                            return (
                                <div key={index} className="display"
                                    onClick={() => handleClick(index)}>
                                    {type}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    click ? (
                        <div className="show" >
                            <div className="close" 
                            onClick={() => {
                                setClick(false)
                                setI(0)
                            }}
                             >X</div>
                            <div> {Name[i]}</div>
                            <div>{`${priName}(${position})`}</div>
                            <div>{address}</div>
                            <div>{state}</div>
                           
                        </div>
                    ) : null
                }
                {/* {
                    Name.map((name, index) => {
                        return (
                            <div>
                                <div></div>
                                {
                                    country.map((country, index) => {
                                        return (
                                            <div>

                                                <div></div>
                                                {
                                                    type?.map((type, index) => {
                                                        return (
                                                            <div>{type}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )

                                    })
                                }
                            </div>
                        )
                    })
                } */}

                {/* {
                    Name.map((name,index,type,country) => {
                        {console.log(country)}
                        return(
                            <div>{`name:${name}`}
                            <div></div>
                            <div></div>
                            <div></div>
                                </div>
                        )
                    })
                }
                {
                    country?.map((country,index) => {
                        return(
                            <div>{country}
                                </div>
                        )
                    })
                }
                  { 
                    type?.map((type,index) => {
                        return(
                            <div>{type}
                                </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}

export default Home