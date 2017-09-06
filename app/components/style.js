import React, {Platform, StyleSheet, Dimensions, PixelRatio} from "react-native";


const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "bannerView": {
        "width": width,
        "height": height / 2
    },
    "whiteContainer":{
        "backgroundColor":"#fff",
        "flex":1,
        "marginTop":100
    },
    "banner": {
        "height": height / 2,
        "width": width,
        "backgroundColor": "#ccc"
    },
    
    "bannerImage": {
        "width": width,
        "height": height / 2
    },
    "dot": {
        "backgroundColor": "rgba(255, 255, 255, 0.3)",
        "width": 15,
        "height": 2,
        "borderRadius": 4,
        "marginLeft": 4,
        "marginRight": 4
    },
    "dotActive": {
        "backgroundColor": "rgba(255, 255, 255, 0.7)",
        "width": 15,
        "height": 2,
        "borderRadius": 4,
        "marginLeft": 4,
        "marginRight": 4
    },
    "bannerText": {
        "position": "absolute",
        "bottom": 0,
        "height": 30 * height/100
    },
    "bannerGradient": {
        "width": width,
        "height": 30 * height/100,
        
        "flex": 1,
        "justifyContent": "flex-end",
        "paddingBottom": 8
    },
    "bannerTitle": {
        "marginTop": 12,
        "marginRight": 12,
        "marginBottom": 8,
        "marginLeft": 12,
        "color": "white",
        "fontSize": 20,
        
    },
    "bannerDate": {
        "color": "rgba(255, 255, 255, 0.7)",
        "fontSize": 11,
        "fontWeight": "500",
        "marginLeft": 12,
        "marginRight": 12,
        "marginBottom": 16,
        
        "width": width - vw * 5
    },
    "fixHeart": {
        
        "top": 10,
        "right": 5,
        "zIndex": 9999
    }
});
