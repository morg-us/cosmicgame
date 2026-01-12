using UnityEngine;

public class SettingsMenuController : MonoBehaviour
{
    public void SetBrightness(float value)
    {
        Debug.Log("Brightness: " + value);
    }

    public void SetVolume(float value)
    {
        AudioListener.volume = value;
    }

    public void SetSensitivity(float value)
    {
        PlayerPrefs.SetFloat("Sensitivity", value);
    }

    public void SetGraphics(int level)
    {
        QualitySettings.SetQualityLevel(level);
    }
}

