import React, {Component} from 'react'
import chunk from 'lodash/chunk'

const DistributionData = [
  {
    title: "1,987",
    subtitle: "Donors",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
  {
    title: "10,432",
    subtitle: "Receipients",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
  {
    title: "1,238,221",
    subtitle: "BAZ Distributed",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
  {
    image: 'https://api.adorable.io/avatars/80/lucy1@adorable.io.png',
    subtitle: "Mittie Hernandez",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
  {
    image: 'https://api.adorable.io/avatars/80/lucy2@adorable.io.png',
    subtitle: "Mittie Hernandez",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
  {
    image: 'https://api.adorable.io/avatars/80/lucy3@adorable.io.png',
    subtitle: "Mittie Hernandez",
    description: "Donors are the group of people that donates towards basic income of recepients. A donor can also be a recepient."
  },
];


const InfoBlock = (props)=> (
    <div className='col-md-4 info-block text-center'>
        <div className='mx-auto'>
            <div className='info-title'> {props.title} </div>
            <div className='info-subtitle'> {props.subtitle} </div>
        </div>
        <p className='description'> {props.description} </p>
    </div>
)

export default class LatestDistributionSection extends Component {

    renderOneInfoBlock = (item, index)=> {
        return (
            <InfoBlock
                key={index}
                subtitle={item.subtitle}
                description={item.description}
                title={
                    item.image 
                        ? <img src={item.image} alt='' width={48} height={48} className='content-image rounded-circle'/>
                        : item.title
                }/>
        )
    }

    render(){

        const [dataChunk1, dataChunk2] = chunk(DistributionData, 3)

        return (
            <div id={this.props.id} className='page-section container latest-distribution-section'>
                <h3 className='text-center mb-2'> Latest Distribution </h3>
                <div className='row content-row mt-4'>
                    { dataChunk1.map(this.renderOneInfoBlock) }
                </div>
                <div className='row content-row'>
                    { dataChunk2.map(this.renderOneInfoBlock) }
                </div>
            </div>
        )
    }
}