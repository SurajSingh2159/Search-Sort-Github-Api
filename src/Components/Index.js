import React, { useEffect, useState } from 'react'

const Index = () => {

    const [repo, setRepo] = useState([]);
    const [searchTitle, setSearchTitle] = useState("")
    const [sortValue, setSortValue] = useState("")

    const sortOptions =["stargazers_count", "watchers_count", "size", "created_at", "updated_at"]

    // const getRepos = async () => {
    //     const response = await fetch("https://api.github.com/users/defunkt/repos");
    //     const FinalData = await response.json();
    //     setRepo(FinalData)
    // }



    // useEffect(() => {
    //     getRepos();
    // }, [])


    const sortRepo = async (e) => {
        if(e){
        let value = e.target.value
        setSortValue(value)
        const response = await fetch(`https://api.github.com/users/defunkt/repos?_sort=${value}&_order=desc`);
        const FinalData = await response.json();
        setRepo(FinalData)
        } else {
        const response = await fetch("https://api.github.com/users/defunkt/repos");
        const FinalData = await response.json();
        setRepo(FinalData)
        }
    }



    useEffect(() => {
        sortRepo();
    }, [])


    return (
        <>
        <div>
            
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a to="/" class="nav-link px-2 link-secondary"><h1>Git Repos</h1></a></li>
            </ul>
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
            <input type="text" class="form-control" placeholder="Search..." onChange={(e)=>setSearchTitle(e.target.value)}aria-label="Search" />
            </form>
            <div id="toolbar">
            <select 
            class="form-control"
            onChange={sortRepo}
            value={sortValue}
            >
                    <option>Please select a value...</option>
                    {sortOptions.map((item, index)=>(
                        <option value={item} key={index}>
                            {item}
                        </option>
                    ))}
            </select>
            </div>
        </div>
        </div>
        </div>
        
    <div className="container">
        
        {
            repo.filter((value)=>{
                // console.log(value)
                if(searchTitle===""){
                    return value;
                }else if(
                    value && value.full_name && value.full_name.toLowerCase().includes(searchTitle.toLowerCase())
                ){
                    return value
                }
            })
            .map((curElem) => {
                // console.log(curElem)
                return (

                    <div className="card_item" key={curElem.id}>
                        <div className="card_inner">
                            <img src={curElem.owner.avatar_url} alt="" />
                            <div className="userName">{curElem.full_name}</div>
                            <div className="userName">{curElem.description}</div>
                            <div className="detail-box">
                                <div className="gitDetail"><span>Stars</span>{curElem.stargazers_count}</div>
                                <div className="gitDetail"><span>Watchers</span>{curElem.watchers_count}</div>
                                <div className="gitDetail"><span>Forks</span>{curElem.forks_count}</div>
                            </div>
                            <div className="gitDetail"><span>Language: {curElem.language}</span></div>
                        </div>

                    </div>
                )
            })
        }

    </div>              

    </>
    )
}

export default Index;

