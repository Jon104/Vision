// import LZ4 from "lz4js";
import gls from "./webgl";

const websocket = new WebSocket("ws://localhost:8001");;

const bindDataToViews = (event) => {
  let data = JSON.parse(event.data)
  switch(data.header) {
    case 'ascan':
      return gls.filter((gl) => gl.type === 'ascan').forEach((gl) => gl.execute(data.a))
    default:
      return console.log("dance around")
  }
  //identify gl and execute data
  //console.log(gls) //execute(data.a)
  // debugger
  // const data = new Buffer(event.data);

  // console.log(data);
  // let dataType = data.type;
  // console.log(dataType)

  // let dataview = new DataView(data.buffer);
  // let convertedData = dataview.getInt32(0, true);
  // console.log(dataview)

  // const decompressedData = new Buffer(convertedData);
  // LZ4.decompressBlock(
  //   data.buffer,
  //   decompressedData,
  //   0,
  //   data.buffer.length,
  //   0
  // );

  // do something with views
}

const socket = {
  connectToCPU: (address, port) => {
    websocket.binaryType = "arraybuffer";
    websocket.onmessage = bindDataToViews;
    websocket.onOpen = (event) => {
      console.log('openned')
    }
  },
  send: (action) => websocket.send(action)
};

export default socket;
