import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
  StyleSheet
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

import { connect } from 'react-redux'
import { fetchData } from '../actions/Actions'

const place = {
  name: "Blok M Square",
  address: "Jalan Melawai V, Melawai, Kebayoran Baru, RT.3/RW.1, Melawai, Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12160",
  latitude: -6.244161,
  longitude: 106.800612
};

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = -6.208973;
const LONGITUDE = 106.845384;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      error: null,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
          error: null,
        }, function afterChange(){
          this.refs.map.animateToRegion(this.state.region);

          var origin = `${this.state.region.latitude},${this.state.region.longitude}`;
          var destination = `${place.latitude},${place.longitude}`;

          this.props.fetchData(origin, destination);
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
    );
  }

  decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})};

  openMaps = () => {
    var url = `http://maps.google.com/maps?saddr=${this.state.region.latitude},${this.state.region.longitude}&daddr=${place.latitude},${place.longitude}`;

    return Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return Promise.reject(new Error(`Could not open the url: ${url}`));
      } else {
        return Linking.openURL(url);
      }
    })
  }

  render(){
    const {
      container,
      viewInfo,
      txtName,
      txtAddress,
      viewButton
    } = styles;

    return (
      <View style={container}>
        <MapView style={container}
          ref='map'
          initialRegion={this.state.region}
          showsUserLocation = {true}
        >
        {
          this.props.appData.data.length ? (
              <MapView.Polyline
                  coordinates={[
                      ...this.decode(this.props.appData.data[0].overview_polyline.points)
                  ]}
                  strokeWidth={4}
                  strokeColor='deepskyblue'
              />
          ) : null
        }
        <MapView.Marker
          coordinate={{latitude: place.latitude, longitude: place.longitude}}
          title={place.name}
          description={place.address}
        />
        </MapView>

        <View style={viewInfo}>
            <Text style={txtName}>{place.name}</Text>
            <Text style={[txtName, txtAddress]}>{place.address}</Text>
        </View>
        <TouchableOpacity onPress={this.openMaps} activeOpacity={0.8} focusedOpacity={1} style={viewButton}>
            <Ionicons
              name={'md-navigate'}
              size={38}
            />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height:120,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    padding:20,
    borderColor:'lightgray',
    borderWidth:1
  },
  txtName: {
    color: 'black',
    fontSize:16
  },
  txtAddress: {
    marginTop:10,
    textAlign: 'center'
  },
  viewButton: {
    backgroundColor:'white',
    position: 'absolute',
    right:10,
    bottom:90,
    width:60,
    height:60,
    borderColor:'lightgray',
    borderWidth:1,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
  }
});

function mapStateToProps (state) {
  return {
    appData: state.appData
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: (origin, destination) => dispatch(fetchData(origin, destination))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapsScreen);
