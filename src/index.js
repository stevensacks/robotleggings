var Class = require("./base/Class");
var CommandMap = require("./base/CommandMap");
var Context = require("./base/Context");

var AsyncCommand = require("./commands/AsyncCommand");
var Command = require("./commands/Command");
var SampleAsyncCommand = require("./commands/SampleAsyncCommand");
var SampleCommand = require("./commands/SampleCommand");

var Event = require("./events/Event");
var SampleEvent = require("./events/SampleEvent");

var RestAPI = require("./net/RestAPI");

var SampleService = require("./services/SampleService");
var Service = require("./services/Service");
var ServiceQueue = require("./services/ServiceQueue");

var Dictionary = require("./utils/Dictionary");

var robotleggings = {
	Class: Class,
	CommandMap: CommandMap,
	Context: Context,
	
	AsyncCommand: AsyncCommand,
	Command: Command,
	SampleAsyncCommand: SampleAsyncCommand,
	SampleCommand: SampleCommand,

	Event: Event,
	SampleEvent: SampleEvent,

	RestAPI: RestAPI,

	SampleService: SampleService,
	Service: Service,
	ServiceQueue: ServiceQueue,

	Dictionary: Dictionary
};
module.exports = robotleggings;