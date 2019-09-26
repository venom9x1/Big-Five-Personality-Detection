import React, { PropTypes } from 'react'
import ReactDOM from "react-dom";
import axios from 'axios';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import has from 'lodash';
import 'whatwg-fetch'


export default class TextPredictor extends React.Component {
  constructor(props, context) {
    super(props, context);
 //   _.bindAll(this, ['handleChange', 'handleSubmit']);
 this.handleChange = this.handleChange.bind(this);
 this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      content: '',
      predictions: false,
      pred_data:{}
    };
  }
  handleChange(e) {
		const content = e.target.value;
		this.setState({
			content: content,
		});
	}

  handleSubmit(e) {
		const { submitComment } = this.props;
		e.preventDefault();
		if (!this.state.content) {
		  return;
		}


    axios.get('http://192.168.10.124:5000/predict/'+this.state.content).then(content=>{
                  this.setState({
                    pred_data : content.data,
                    predictions: true

                  })
                  console.log('=====>',this.state.pred_data);

               }).catch(e=>{
                 console.log('error===>',e);
                 
               })
              

  //   fetch("http://192.168.10.124:5000/predict", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(this.state.content)
  //   }).then(response =>
  //       response.json().then(data => ({
  //           data: data,
  //           status: response.status
  //       })
  //   ).then(res => {
  //     this.setState({
  //       predictions: res.data,
  //     });
  //   }))
	// }

              }

  render() {

    if (this.state.predictions != false) {
      let pedData = this.state.pred_data;
      var predictions_table = <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn>Prediction</TableHeaderColumn>
            <TableHeaderColumn>Openness</TableHeaderColumn>
            <TableHeaderColumn>Conscientiousness</TableHeaderColumn>
            <TableHeaderColumn>Extraversion</TableHeaderColumn>
            <TableHeaderColumn>Agreeableness</TableHeaderColumn>
            <TableHeaderColumn>Neuroticism</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableRowColumn>Probability of Trait</TableRowColumn>
            <TableRowColumn>{pedData.pred_prob_cOPN}</TableRowColumn>
            <TableRowColumn>{pedData.pred_prob_cCON}</TableRowColumn>
            <TableRowColumn>{pedData.pred_prob_cEXT}</TableRowColumn>
            <TableRowColumn>{pedData.pred_prob_cAGR}</TableRowColumn>
            <TableRowColumn>{pedData.pred_prob_cNEU}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Trait Category</TableRowColumn>
            <TableRowColumn>{pedData.pred_cOPN}</TableRowColumn>
            <TableRowColumn>{pedData.pred_cCON}</TableRowColumn>
            <TableRowColumn>{pedData.pred_cEXT}</TableRowColumn>
            <TableRowColumn>{pedData.pred_cAGR}</TableRowColumn>
            <TableRowColumn>{pedData.pred_cNEU}</TableRowColumn>
          </TableRow>
          <TableRow>
            <TableRowColumn>Trait Score</TableRowColumn>
            <TableRowColumn>{pedData.pred_sOPN}</TableRowColumn>
            <TableRowColumn>{pedData.pred_sCON}</TableRowColumn>
            <TableRowColumn>{pedData.pred_sEXT}</TableRowColumn>
            <TableRowColumn>{pedData.pred_sAGR}</TableRowColumn>
            <TableRowColumn>{pedData.pred_sNEU}</TableRowColumn>
          </TableRow>
        </TableBody>
      </Table>
      // <Table>
      //   <TableHeader>
      //     <TableRow>
      //       <TableHeaderColumn>Trait</TableHeaderColumn>
      //       <TableHeaderColumn>Pred. Probability</TableHeaderColumn>
      //       <TableHeaderColumn>Pred. Category</TableHeaderColumn>
      //       <TableHeaderColumn>Pred. Score</TableHeaderColumn>
      //     </TableRow>
      //   </TableHeader>
      //   <TableBody>
      //     <TableRow>
      //       <TableRowColumn>Openness</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_prob_cOPN}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_cOPN}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_sOPN}</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>Conscientiousness</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_prob_cCON}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_cCON}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_sCON}</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>Extraversion</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_prob_cEXT}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_cEXT}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_sEXT}</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>Agreeableness</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_prob_cAGR}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_cAGR}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_sAGR}</TableRowColumn>
      //     </TableRow>
      //     <TableRow>
      //       <TableRowColumn>Neuroticism</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_prob_cNEU}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_cNEU}</TableRowColumn>
      //       <TableRowColumn>{predictions.pred_sNEU}</TableRowColumn>
      //     </TableRow>
      //   </TableBody>
      // </Table>
    }
    else {
      var predictions_table = null
    }

    return(<div style={{margin: 30}}>
      <h2>Assesshub Personality Predictor</h2>
      <p>
        Predict the personality From Text Analysis.
      </p>
      <div>
        <TextField hintText="Input Text"
                  multiLine={true}
                  floatingLabelText="Input Text"
                  onChange={this.handleChange}
                value={this.state.content}/>
      </div>
      <RaisedButton label="Predict" type="button" primary={true} onClick={this.handleSubmit}/>
      <div>
        {predictions_table}
      </div>
    </div>
    )
  }
}
