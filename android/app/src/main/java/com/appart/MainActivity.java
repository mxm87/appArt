package com.appart;

// [react-native-bootsplash] - start
import android.os.Bundle;
// [react-native-bootsplash] - end

import com.facebook.react.ReactActivity;

// [react-native-bootsplash] - start
import com.zoontek.rnbootsplash.RNBootSplash;
// [react-native-bootsplash] - end

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "appArt";
  }

  // [react-native-bootsplash] - start
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this);
  }
  // [react-native-bootsplash] - end
}
