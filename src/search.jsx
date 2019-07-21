import axios from 'axios';
import React from 'react';

class Search extends React.Component {
    state = {
        data: [],
        stokedData: [],
        searchData: [], iputValue: ""
    }
    checkboxhandler(e) {
        this.setState({iputValue:""});
        let isChecked = e.target.checked;
        console.log(isChecked)
        this.setState({ data: this.state.data });
        let stockedItems = []
        this.state.data.map(o => {
            let map = {};
            map["category"] = o.category;
            map["details"] = o.details.filter(k => k.stocked === true);
            return stockedItems.push(map)

        });


        isChecked === true ? this.setState({ data: stockedItems, searchData: stockedItems }) : this.setState({ data: this.state.stokedData, searchData: this.state.stokedData })




    }

    filterList(event) {
      
        let searchText = event.target.value;
       // console.log("data", searchText)
        let update = this.state.searchData;
        this.setState({iputValue:searchText});
        let map = {};
        let searchArray = [];
        for (let el of update) {

            let uniqeSearchArray = searchArray.map(o => o.category)
            let check = uniqeSearchArray.includes(el["category"])
            if (!map[el.category] && !check) {

                map.category = el.category;
                map.details = el.details.filter(k => k.name.toLowerCase().search(searchText.toLowerCase()) !== -1);
                searchArray.push({ ...map, ...map });
            } else {

            }

        }

        this.setState({ data: searchArray });
    }

    componentDidMount() {
        let finalFilteredArray = [];

        axios.get(`https://api.myjson.com/bins/109m7i`)
            .then(res => {
                const data = res.data;
                let map = {};
                for (let el of data) {
                    let uniqefilterdArry = finalFilteredArray.map(o => o.category)
                    let check = uniqefilterdArry.includes(el["category"])

                    if (!map[el.category] && !check) {
                        map["category"] = el.category;
                        map["details"] = [{ name: el.name, stocked: el.stocked, price: el.price }]
                        finalFilteredArray.push({ ...map, ...map })
                    }
                    else {
                        map["details"].push({ name: el.name, stocked: el.stocked, price: el.price })

                    }

                }
                this.setState({ data: finalFilteredArray, stokedData: finalFilteredArray, searchData: finalFilteredArray });





            })
    }

    render() {
        console.log(this.state)


        return (


            <div className="container">


                <div style={{ marginTop: 10, padding: 10, width: "30%", marginLeft: "35%" }}>
                    <input type="text" className="form-control" value={this.state.iputValue} placeholder="Search..." title="Search Here" onChange={e => this.filterList(e)} aria-describedby="basic-addon2" />
                    <div style={{ float: "left" }}> <input type="checkbox" onChange={e => this.checkboxhandler(e)} /> <span>Only show products in stock </span>  </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <h4>Name</h4>
                        </div>
                        <div className="col"> <h4>Price</h4></div>
                    </div>

                </div>

                {this.state.data.map((ob, i) => {
                    return <h3 key={i}>{ob.category}



                        {ob.details.map((k, i) => {
                            let color1 = k.stocked === true ? "black" : "red";


                            return <div style={{ color: color1 }} key={i}>

                                <div className="row">
                                    <div className="col">
                                        <h4 style={{ width: "172%" }}>{k.name}</h4>
                                    </div>
                                    <div className="col"> <h4 style={{ width: "28%" }}>{k.price}</h4></div>
                                </div>

                            </div>


                        })}




                    </h3>

                })}
            </div>);
    }
}

export default Search;