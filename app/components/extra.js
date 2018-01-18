<View style={{justifyContent:'center',flexDirection:'row',height:50,marginLeft:10}}>
              <View><Image source={{uri: this.state.userInfo?this.state.userInfo.picture:'https://qdesq.imagekit.io/img/tr:q-10/home.padding'}} style={styles.userImg} /> </View>
               <View style={{justifyContent:'center'}}> <Text style={{justifyContent:'center'}}>{this.state.userInfo?this.state.userInfo.name:'User'}</Text></View>
            </View>