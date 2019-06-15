package com.lishe;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.reactnativecomponent.splashscreen.RCTSplashScreen;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        RCTSplashScreen.openSplashScreen(this);  
        // RCTSplashScreen.openSplashScreen();   //open splashscreen fullscreen
        super.onCreate(savedInstanceState);
    }
    @Override
    protected String getMainComponentName() {
        return "Lishe";
    }
}
