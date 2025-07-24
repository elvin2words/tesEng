            {(showPopup || isHovered) && (
              <div className="fixed bottom-24 sm:right-1/2 sm:translate-x-1/2 z-50 animate-fade-in-up max-w-xs">
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-5 w-42 max-w-full sm:w-52">
                  
                  {/* Tooltip arrow */}
                  {/* <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b transform rotate-45"></div> */}
                  <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45 z-0"></div>
                  {/* <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white dark:bg-gray-900 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45 z-0"></div> */}
                  {/* <div className="absolute -bottom-2 right-6 sm:right-1/2 sm:translate-x-1/2 w-4 h-4 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div> */}
                  
                  <div className="flex flex-col items-center text-center space-y-0 w-15">
                    {/* Icon and title row */}
                    <div className="flex items-center space-x-1 mb-1">
                    {/* Bot icon */}
                    {/* <div className="flex-shrink-0 w-10 h-10 bg-solar-orange rounded-full flex items-center justify-center shadow-md"> */}
                      <div className="w-8 h-8 bg-solar-orange rounded-full flex items-center justify-center shadow-md">
                      <Bot className="h-4 w-4 text-white" />
                      </div>
                      {/* Text content */}
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white ">
                        Ask SmartTES 🤖
                      </h4>
                    </div>
                    {/* Description */}
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-snug">
                        Not sure what you need? Chat with our AI assistant to size your system.
                      </p>
                      {/* Start Chat Button */}
                      <Button
                        onClick={handleOpenChat}
                        className="mt-2 bg-solar-orange hover:bg-orange-600 text-white text-xs font-medium h-7 px-4 rounded-md transition-all duration-200"
                      >
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            