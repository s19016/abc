import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  TextField,
  Avatar,
  ListItemIcon
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {
  ShowChart,
  WbSunny,
  CloudQueue,
  LabelImportant
} from '@material-ui/icons'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      item: {
        weather: '',
        temperature: '',
        icon: '',
        pressure: '',
        speed: ''
      },
      placeName: ''
    }
    this.apiToken = 'e121d45d62a927953115196e6a945df7'
  }

  async getData (id) {
    const getJSON = (uri, options) =>
      window
        .fetch(uri, options)
        .then(res => res.json())
        .then(json => ({
          weather: json.weather[0].description,
          icon: json.weather[0].icon,
          temperature: json.main.temp,
          pressure: json.main.pressure,
          speed: json.wind.speed
        }))

    const options = { method: 'get' }
    const uri = 'http://api.openweathermap.org/data/2.5/weather?'
    const params = `&appid=${this.apiToken}&id=${id}`
    const data = await getJSON(uri + params, options)
    this.setState({ item: data })
  }

  handleUpdate (event) {
    const index = event.target.dataset.optionIndex
    const place = this.state.data[index]
    this.getData(place.id)
    this.setState({ placeName: place.name })
  }

  async componentDidMount () {
    this.setState({
      data: [
        { name: '那覇', id: 1856035 },
        { name: '名護', id: 1856068 },
        { name: '沖縄', id: 1894616 },
        { name: '恩納', id: 1854037 },
        { name: '北谷', id: 1864652 },
        { name: '今帰仁', id: 1855713 },
        { name: '座間味', id: 1848002 },
        { name: '西', id: 1855357 },
        { name: '本部', id: 1894388 },
        { name: '伊是名', id: 1861124 }
      ]
    })
  }

  render () {
    console.log(this.state)
    return (
      <Card>
        <div class='title'>
          <CardHeader width='auto' />
          <CardHeader title='沖縄の都市天気' />
        </div>
        <CardActions>
          <SelectorView
            data={this.state.data}
            handleUpdate={this.handleUpdate.bind(this)}
          />
        </CardActions>
        <CardContent>
          <ListView item={this.state.item} />
        </CardContent>
      </Card>
    )
  }
}

const SelectorView = props => (
  <Autocomplete
    options={props.data}
    getOptionLabel={option => option.name}
    renderInput={params => (
      <TextField
        {...params}
        label='場所を選択してください。'
        variant='outlined'
        style={{ width: 500 }}
        fullWidth
      />
    )}
    onChange={props.handleUpdate}
  />
)

const ListView = props => {
  const { weather, icon, temperature, pressure, speed } = props.item
  const formatTemperature = temperature ? `${temperature}℃ ` : ''
  const formatPressure = pressure ? `${pressure}hap` : ''
  const formatSpeed = speed ? `${speed}m/s` : ''
  const path = `http://openweathermap.org/img/wn/${icon}.png`
  const image = icon ? <Avatar src={path} alt={weather} /> : <WbSunny />
  console.log('props', props)
  return (
    <List class='b'>
      <ListItem>
        <ListItemIcon>{image}</ListItemIcon>
        <ListItemText primary={weather} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <ShowChart />
        </ListItemIcon>
        <ListItemText primary={formatTemperature} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CloudQueue />
        </ListItemIcon>
        <ListItemText primary={formatPressure} />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LabelImportant />
        </ListItemIcon>
        <ListItemText primary={formatSpeed} />
      </ListItem>
    </List>
  )
}

export default App
