// All the sysytem level configurations should be presented here
var conf = {
    productionServer: {
    	server: "http://ImpressionServer-146215825.us-west-2.elb.amazonaws.com/",
    	protocol: "http",
    },
	
	testServer: {
		server: "http://localhost:8000/",
		protocol: "http"
	},
	
	effectServer: {
		// server: "http://localhost:8000/",
		// server: "http://Impression-1884812429.us-west-2.elb.amazonaws.com/",
		server: "http://www.impressionsrating.com/",
		protocol: "http"
	},
}