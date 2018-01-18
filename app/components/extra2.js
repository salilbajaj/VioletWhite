this.setState({
                modalVisible:false
                },()=>{
                  if(!this.props.fromMenu){
                  this.props.loginResult(true)
            }else if(this.props.fromMenu){
              this.props.navigator.dismissAllModals({
              animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
            });
            }
                })