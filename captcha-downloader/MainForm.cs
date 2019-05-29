using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp3
{
    public partial class MainForm : Form
    {
        public MainForm()
        {
            InitializeComponent();
        }


        public Bitmap GetImage()
        {

            WebClient client = new WebClient();
            Stream stream = client.OpenRead("https://obis1.selcuk.edu.tr/CaptchaHandler.ashx");
            Bitmap bitmap; bitmap = new Bitmap(stream);

             stream.Flush();
            stream.Close();
            client.Dispose();
            if (bitmap != null)
            {
                _bitmap = bitmap;
                return bitmap;
            }
            return null;
        }

        public void SaveImage(string captcha)
        {

            if (!Directory.Exists("captcha"))
                Directory.CreateDirectory("captcha");
            _bitmap.Save("captcha\\" + captcha + ".jpeg",System.Drawing.Imaging.ImageFormat.Tiff);
            File.WriteAllText("captcha\\" + captcha + ".gt.txt", captcha);


        }
        Bitmap _bitmap;
        private void textBox1_KeyDown(object sender, KeyEventArgs e)
        {
            if(e.KeyCode == Keys.Enter && textBox1.Text.Length==4)
            {
                SaveImage(textBox1.Text);
                textBox1.Text = "";
                pictureBox1.Image = GetImage();
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            pictureBox1.Image = GetImage();
        }
    }
}
