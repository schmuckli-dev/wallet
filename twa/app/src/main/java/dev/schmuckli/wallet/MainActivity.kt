package dev.schmuckli.wallet

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.support.customtabs.trusted.LauncherActivity

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        android.os.Handler().postDelayed(
                {
                    val intent = Intent(this, LauncherActivity::class.java)
                    startActivity(intent)

                    finish()
                },
                300)
    }
    
}
