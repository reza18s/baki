package ir.baki.app

import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.getcapacitor.BridgeActivity


class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        registerPlugin(BazarPlugin::class.java)
//        installSplashScreen()
        super.onCreate(savedInstanceState)
        BazarPlugin.init(this)
    }

    override fun onDestroy() {
        super.onDestroy()
        BazarPlugin.disconnect()
    }
}
