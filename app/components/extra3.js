<View style={styles.buttonContainer}>
            <TouchableHighlight
              underlayColor="green"
              onPress={this.openImagePicker}
              style={styles.uploadButtons}
            >
              <View
                style={[
                  styles.buttons,
                  {
                    backgroundColor: "rgba(128,0,128,.6)",
                    borderColor: "rgba(128,0,128,.6)"
                  }
                ]}
              >
                <Text style={{ color: "#fff" }}>{this.state.uploadText}</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor="green"
              onPress={this.postFeed.bind(this)}
              style={styles.uploadButtons}
            >
              <View
                style={[
                  styles.buttons,
                  { backgroundColor: "#00f", borderColor: "#00f" }
                ]}
              >
                <Text style={{ color: "#fff" }}>Post</Text>
              </View>
            </TouchableHighlight>
          </View>